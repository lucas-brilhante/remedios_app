import React from 'react';
import { routes } from '../routes/routes';
import {
  Welcome,
  CategoryForm,
  CategoriesList,
  DrugForm,
  DrugsList,
  MedicalPrescriptionForm,
  MedicalPrescriptionsList,
  UsersList,
} from '../routes';

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
