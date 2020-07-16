import React from "react";
import Welcome from "../routes/Welcome";
import CategoryForm from "../routes/CategoryForm";
import CategoriesList from "../routes/CategoriesList";
import DrugForm from "../routes/DrugForm";
import DrugsList from "../routes/DrugsList";
import MedicalPrescriptionForm from "../routes/MedicalPrescriptionForm";
import MedicalPrescriptionsList from "../routes/MedicalPrescriptionsList";
import UsersList from "../routes/UsersList";
import { routes } from "../routes";

const RoutesNavigator = ({ route, handleRoute, routeProps }) => {
  switch (route) {
    case routes.addCategory:
      return <CategoryForm handleRoute={handleRoute} routeProps={routeProps} />;
    case routes.listCategories:
      return <CategoriesList handleRoute={handleRoute} />;
    case routes.addDrug:
      return <DrugForm handleRoute={handleRoute} routeProps={routeProps} />;
    case routes.listDrugs:
      return <DrugsList handleRoute={handleRoute} />;
    case routes.addMedicalPrescription:
      return (
        <MedicalPrescriptionForm
          handleRoute={handleRoute}
          routeProps={routeProps}
        />
      );
    case routes.listMedicalPrescriptions:
      return <MedicalPrescriptionsList handleRoute={handleRoute} />;
    case routes.listUsers:
      return <UsersList handleRoute={handleRoute} />;
    default:
      return <Welcome />;
  }
};

export default RoutesNavigator;
