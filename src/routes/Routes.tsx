import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

// Import des composants de page
import Home from '../pages/Home';
import QuelEstVotreProjetDInvestissement from '../pages/1QuelEstVotreProjetDInvestissement';
import QuelMontantSouhaitezVousPlacer from '../pages/2QuelMontantSouhaitezVousPlacer';
import QuelMontantRegulierSouhaitezVousPlacer from '../pages/3QuelMontantRegulierSouhaitezVousPlacer';
import QuelEstVotreHorizonDInvestissement from '../pages/4QuelEstVotreHorizonDInvestissement';
import VersementRegulier from '../pages/4VersementRegulier'; // Ajout de l'import pour 4VersementRegulier
import ESGPreference from '../pages/7ESGPreference';
import QuelEstVotreDateDeNaissance from '../pages/5QuelEstVotreDateDeNaissance';
import EtesVousResidentFiscalFrancais from '../pages/6EtesVousResidentFiscalFrancais';
import NombreEnfantsACharge from '../pages/8NombreEnfantsACharge';
import RevenusAnnuels from '../pages/9RevenusAnnuels';
import ResidencePrincipale from '../pages/10ResidencePrincipale';
import MontantLoyerMensuel from '../pages/11MontantLoyerMensuel';
import MontantCreditImmobilierMensuel from '../pages/11MontantCreditImmobilierMensuel';
import ValeurPatrimoineImmobilierNet from '../pages/12ValeurPatrimoineImmobilierNet';
import MontantPatrimoineFinancier from '../pages/13MontantPatrimoineFinancier';
import MontantEpargneMensuel from '../pages/14MontantEpargneMensuel';
import BesoinEpargne from '../pages/15BesoinEpargne';
import BesoinInvestissement from '../pages/16BesoinInvestissement';
import PlacementAssuranceVie from '../pages/17PlacementAssuranceVie';
import PerceptionGainRisque from '../pages/18PerceptionGainRisque';
import EtfCapitalGaranti from '../pages/19EtfCapitalGaranti';
import GestionPortefeuille from '../pages/20GestionPortefeuille';
import PertePlacements from '../pages/21PertePlacements';
import RapportGainsPertes from '../pages/22RapportGainsPertes';
import RapportGainsPertes10Ans from '../pages/23RapportGainsPertes10Ans';
import PerteValeurInvestissement from '../pages/24PerteValeurInvestissement';
import SimulationReady from '../pages/CreationCompte';
import CreationCompte from '../pages/CreationCompte';
import NotificationPreferences from '../pages/25NotificationPreferences';
import CombinedRiskScoreComponent from '../pages/26CombinedRiskScoreComponent';
import Recommandation from '../recommandation/Recommandation';
import ContactInformation from '../pages/InformationsDeContact'; // Import du composant ContactInformation

export const routes = [
  { path: '/', name: 'Home', component: <Home />, hidden: true },
  { path: '/quel-est-votre-projet-d-investissement', name: 'QuelEstVotreProjetDInvestissement', component: <QuelEstVotreProjetDInvestissement />, hidden: true },
  { path: '/quel-montant-souhaitez-vous-placer', name: 'QuelMontantSouhaitezVousPlacer', component: <QuelMontantSouhaitezVousPlacer />, hidden: true },
  { path: '/quel-montant-regulier-souhaitez-vous-placer', name: 'QuelMontantRegulierSouhaitezVousPlacer', component: <QuelMontantRegulierSouhaitezVousPlacer />, hidden: true },
  { path: '/quel-est-votre-horizon-d-investissement', name: 'QuelEstVotreHorizonDInvestissement', component: <QuelEstVotreHorizonDInvestissement />, hidden: true },
  { path: '/versement-regulier', name: 'VersementRegulier', component: <VersementRegulier />, hidden: true }, // Ajout de la route pour 4VersementRegulier
  { path: '/esg-preference', name: 'ESGPreference', component: <ESGPreference />, hidden: true },
  { path: '/quel-est-votre-date-de-naissance', name: 'QuelEstVotreDateDeNaissance', component: <QuelEstVotreDateDeNaissance />, hidden: true },
  { path: '/etes-vous-resident-fiscal-francais', name: 'EtesVousResidentFiscalFrancais', component: <EtesVousResidentFiscalFrancais />, hidden: true },
  { path: '/nombre-enfants-a-charge', name: 'NombreEnfantsACharge', component: <NombreEnfantsACharge />, hidden: true },
  { path: '/revenus-annuels', name: 'RevenusAnnuels', component: <RevenusAnnuels />, hidden: true },
  { path: '/residence-principale', name: 'ResidencePrincipale', component: <ResidencePrincipale />, hidden: true },
  { path: '/montant-loyer-mensuel', name: 'MontantLoyerMensuel', component: <MontantLoyerMensuel />, hidden: true },
  { path: '/montant-credit-immobilier-mensuel', name: 'MontantCreditImmobilierMensuel', component: <MontantCreditImmobilierMensuel />, hidden: true },
  { path: '/valeur-patrimoine-immobilier-net', name: 'ValeurPatrimoineImmobilierNet', component: <ValeurPatrimoineImmobilierNet />, hidden: true },
  { path: '/montant-patrimoine-financier', name: 'MontantPatrimoineFinancier', component: <MontantPatrimoineFinancier />, hidden: true },
  { path: '/montant-epargne-mensuel', name: 'MontantEpargneMensuel', component: <MontantEpargneMensuel />, hidden: true },
  { path: '/besoin-epargne', name: 'BesoinEpargne', component: <BesoinEpargne />, hidden: true },
  { path: '/besoin-investissement', name: 'BesoinInvestissement', component: <BesoinInvestissement />, hidden: true },
  { path: '/placement-assurance-vie', name: 'PlacementAssuranceVie', component: <PlacementAssuranceVie />, hidden: true },
  { path: '/perception-gain-risque', name: 'PerceptionGainRisque', component: <PerceptionGainRisque />, hidden: true },
  { path: '/etf-capital-garanti', name: 'EtfCapitalGaranti', component: <EtfCapitalGaranti />, hidden: true },
  { path: '/gestion-portefeuille', name: 'GestionPortefeuille', component: <GestionPortefeuille />, hidden: true },
  { path: '/perte-placements', name: 'PertePlacements', component: <PertePlacements />, hidden: true },
  { path: '/rapport-gains-pertes', name: 'RapportGainsPertes', component: <RapportGainsPertes />, hidden: true },
  { path: '/rapport-gains-pertes-10-ans', name: 'RapportGainsPertes10Ans', component: <RapportGainsPertes10Ans />, hidden: true },
  { path: '/perte-valeur-investissement', name: 'PerteValeurInvestissement', component: <PerteValeurInvestissement />, hidden: true },
  { path: '/simulation-ready', name: 'SimulationReady', component: <SimulationReady />, hidden: true },
  { path: '/creation-compte', name: 'CreationCompte', component: <CreationCompte />, hidden: true },
  { path: '/notification-preferences', name: 'NotificationPreferences', component: <NotificationPreferences />, hidden: true },
  { path: '/combined-risk-score', name: 'CombinedRiskScoreComponent', component: <CombinedRiskScoreComponent />, hidden: true },
  { path: '/recommandation', name: 'Recommandation', component: <Recommandation />, hidden: true },
  { path: '/contact-information', name: 'ContactInformation', component: <ContactInformation />, hidden: true }, // Ajout de la route pour ContactInformation
];

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
