package com.abc.clinicals.Util;

import com.abc.clinicals.Entities.ClinicalData;

import java.util.List;

public class BMICalculator {
    public static void calculateBMI(List<ClinicalData>clinicalData, ClinicalData data) {
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
}
