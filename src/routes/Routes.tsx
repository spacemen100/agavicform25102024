// Import des dépendances nécessaires
import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

// Import des composants de page
import Home from '../pages/Home';
import QuelEstVotreProjetDInvestissement from '../pages/QuelEstVotreProjetDInvestissement';
import QuelMontantSouhaitezVousPlacer from '../pages/QuelMontantSouhaitezVousPlacer';
import QuelMontantRegulierSouhaitezVousPlacer from '../pages/QuelMontantRegulierSouhaitezVousPlacer';
import QuelEstVotreHorizonDInvestissement from '../pages/QuelEstVotreHorizonDInvestissement';
import ESGPreference from '../pages/ESGPreference';
import QuelEstVotreDateDeNaissance from '../pages/QuelEstVotreDateDeNaissance';
import EtesVousResidentFiscalFrancais from '../pages/EtesVousResidentFiscalFrancais';
import NombreEnfantsACharge from '../pages/NombreEnfantsACharge'; // Ajout de l'import pour NombreEnfantsACharge

// Définition des routes
export const routes = [
  { path: '/', name: 'Home', component: <Home />, hidden: true },
  { path: '/quel-est-votre-projet-d-investissement', name: 'QuelEstVotreProjetDInvestissement', component: <QuelEstVotreProjetDInvestissement />, hidden: true },
  { path: '/quel-montant-souhaitez-vous-placer', name: 'QuelMontantSouhaitezVousPlacer', component: <QuelMontantSouhaitezVousPlacer />, hidden: true },
  { path: '/quel-montant-regulier-souhaitez-vous-placer', name: 'QuelMontantRegulierSouhaitezVousPlacer', component: <QuelMontantRegulierSouhaitezVousPlacer />, hidden: true },
  { path: '/quel-est-votre-horizon-d-investissement', name: 'QuelEstVotreHorizonDInvestissement', component: <QuelEstVotreHorizonDInvestissement />, hidden: true },
  { path: '/esg-preference', name: 'ESGPreference', component: <ESGPreference />, hidden: true },
  { path: '/quel-est-votre-date-de-naissance', name: 'QuelEstVotreDateDeNaissance', component: <QuelEstVotreDateDeNaissance />, hidden: true },
  { path: '/etes-vous-resident-fiscal-francais', name: 'EtesVousResidentFiscalFrancais', component: <EtesVousResidentFiscalFrancais />, hidden: true },
  { path: '/nombre-enfants-a-charge', name: 'NombreEnfantsACharge', component: <NombreEnfantsACharge />, hidden: true }, // Ajout de la route pour NombreEnfantsACharge
];

// Composant des routes
const Routes: React.FC = () => {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
    </Switch>
  );
};

export default Routes;
