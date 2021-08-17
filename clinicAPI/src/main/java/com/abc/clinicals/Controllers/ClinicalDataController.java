package com.abc.clinicals.Controllers;


import com.abc.clinicals.DataTransferObject.ClinicalDataRequest;
import com.abc.clinicals.Entities.ClinicalData;
import com.abc.clinicals.Entities.Patient;
import com.abc.clinicals.Repositories.ClinicalDataRepository;
import com.abc.clinicals.Repositories.PatientRepository;
import com.abc.clinicals.Util.BMICalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ClinicalDataController {

    @Autowired
    private ClinicalDataRepository clinicalDataRepository;

    @Autowired
    private PatientRepository patientRepository;

    @PostMapping("/clinicals")
    public ClinicalData saveClinicalData(@RequestBody ClinicalDataRequest clinicalDataRequest) {
        Patient patient = patientRepository.findById(clinicalDataRequest.getPatientId()).get();
        ClinicalData clinicalData = new ClinicalData();
        clinicalData.setComponentName(clinicalDataRequest.getComponentName());
        clinicalData.setComponentValue(clinicalDataRequest.getComponentValue());
        clinicalData.setPatient(patient);
        return clinicalDataRepository.save(clinicalData);
    }

    @GetMapping("/clinicals/{patientId}/{componentName}")
    public List<ClinicalData> getClinicalData(@PathVariable int patientId,@PathVariable String componentName) {
        if(componentName.equals("bmi")) {
            componentName = "hw";
        }
        List<ClinicalData> clinicalData = clinicalDataRepository.findByPatientIdAndComponentNameOrderByMeasuredDateTime(patientId, componentName);

        List<ClinicalData>dupClinicalData = new ArrayList<>(clinicalData);
        for(ClinicalData data: dupClinicalData) {
            BMICalculator.calculateBMI(clinicalData,data);
        }
        return clinicalData;
    }
}
