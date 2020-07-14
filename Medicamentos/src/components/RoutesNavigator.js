import React from "react";
import Welcome from "../routes/Welcome";
import CategoryForm from "../routes/CategoryForm";
import CategoriesList from "../routes/CategoriesList";
import DrugForm from "../routes/DrugForm";
import DrugsList from "../routes/DrugsList";
import MedicalPrescriptionForm from "../routes/MedicalPrescriptionForm";
import MedicalPrescriptionsList from "../routes/MedicalPrescriptionsList";

export const routes = {
  welcome: 0,
  addCategory: 1,
  listCategories: 2,
  addDrug: 3,
  listDrugs: 4,
  addMedicalPrescription: 5,
  listMedicalPrescriptions: 6,
};

const RoutesNavigator = ({ route }) => {
  switch (route) {
    case routes.addCategory:
      return <CategoryForm />;
    case routes.listCategories:
      return <CategoriesList />;
    case routes.addDrug:
      return <DrugForm />;
    case routes.listDrugs:
      return <DrugsList />;
    case routes.addMedicalPrescription:
      return <MedicalPrescriptionForm />;
    case routes.listMedicalPrescriptions:
      return <MedicalPrescriptionsList />;
    default:
      return <Welcome />;
  }
};

export default RoutesNavigator;
