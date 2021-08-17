package com.abc.clinicals.Controllers;

import com.abc.clinicals.Entities.ClinicalData;
import com.abc.clinicals.Entities.Patient;
import com.abc.clinicals.Repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;
    Map<String,String> filters = new HashMap<>();

    @GetMapping("/patients")
    public List<Patient> getPatients () {
        return patientRepository.findAll();
    }

    @GetMapping("/patients/{id}")
    public Patient getPatient(@PathVariable int id) {
        return patientRepository.findById(id).get();
    }

    @PostMapping("/patients")
    public Patient savePatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @GetMapping("/patients/analyze/{id}")
    public Patient analyze(@PathVariable int id) {
        Patient patient = patientRepository.findById(id).get();
        List<ClinicalData> clinicalData = patient.getClinicalData();
        List<ClinicalData> dupClinicalData = new ArrayList<>(clinicalData);
        for(ClinicalData data : dupClinicalData) {
            if(filters.containsKey(data.getComponentName())) {
                clinicalData.remove(data);
                continue;
            }
            else {
                filters.put(data.getComponentName(),null);
            }
            if(data.getComponentName().equals("hw")) {
                String[] heightAndWeight = data.getComponentValue().split("/");
                if(heightAndWeight!=null&&heightAndWeight.length>1) {
                    float heightInMetres = Float.parseFloat(heightAndWeight[0])*0.4536F;
                    float bmi = Float.parseFloat(heightAndWeight[1])/(heightInMetres*heightInMetres);
                    ClinicalData bmiData = new ClinicalData();
                    bmiData.setComponentName("bmi");
                    bmiData.setComponentValue(Float.toString(bmi));
                    clinicalData.add(bmiData);
                }
            }
        }
        filters.clear();
        return patient;
    }
}
