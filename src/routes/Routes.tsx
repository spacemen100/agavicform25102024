// src/routes/Routes.tsx
import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Import des composants de page
import Home from '../pages/Home';
import QuelEstVotreProjetDInvestissement from '../pages/1QuelEstVotreProjetDInvestissement';
import QuelMontantSouhaitezVousPlacer from '../pages/2QuelMontantSouhaitezVousPlacer';
import SouscrireEnLigne from '../2emepartiesouscription/SouscrireEnLigne';
import QuelMontantRegulierSouhaitezVousPlacer from '../pages/3QuelMontantRegulierSouhaitezVousPlacer';
import QuelEstVotreHorizonDInvestissement from '../pages/4QuelEstVotreHorizonDInvestissement';
import VersementRegulier from '../pages/4VersementRegulier';
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
import ContactInformation from '../pages/InformationsDeContact';
import InformationsDeContactPhone from '../pages/InformationsDeContactPhone';
import ContactPermission from '../pages/ContactPermission';
import TermsAndConditionsConfirmation from '../pages/TermsAndConditionsConfirmation';
import SubscriptionChoice from '../2emepartiesouscription/SubscriptionChoice';
import ConseillerRappel from '../2emepartiesouscription/ConseillerRappel';
import SubscriberInfoForm from '../2emepartiesouscription/SubscriberInfoForm';

// Import des composants d'authentification
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export const routes = [
  { path: '/', name: 'Home', component: <Home />, hidden: true, protected: false },
  { path: '/quel-est-votre-projet-d-investissement', name: 'QuelEstVotreProjetDInvestissement', component: <QuelEstVotreProjetDInvestissement />, hidden: true, protected: false },
  { path: '/quel-montant-souhaitez-vous-placer', name: 'QuelMontantSouhaitezVousPlacer', component: <QuelMontantSouhaitezVousPlacer />, hidden: true, protected: false },
  { path: '/quel-montant-regulier-souhaitez-vous-placer', name: 'QuelMontantRegulierSouhaitezVousPlacer', component: <QuelMontantRegulierSouhaitezVousPlacer />, hidden: true, protected: false },
  { path: '/quel-est-votre-horizon-d-investissement', name: 'QuelEstVotreHorizonDInvestissement', component: <QuelEstVotreHorizonDInvestissement />, hidden: true, protected: false },
  { path: '/versement-regulier', name: 'VersementRegulier', component: <VersementRegulier />, hidden: true, protected: false },
  { path: '/esg-preference', name: 'ESGPreference', component: <ESGPreference />, hidden: true, protected: false },
  { path: '/quel-est-votre-date-de-naissance', name: 'QuelEstVotreDateDeNaissance', component: <QuelEstVotreDateDeNaissance />, hidden: true, protected: false },
  { path: '/etes-vous-resident-fiscal-francais', name: 'EtesVousResidentFiscalFrancais', component: <EtesVousResidentFiscalFrancais />, hidden: true, protected: false },
  { path: '/nombre-enfants-a-charge', name: 'NombreEnfantsACharge', component: <NombreEnfantsACharge />, hidden: true, protected: false },
  { path: '/revenus-annuels', name: 'RevenusAnnuels', component: <RevenusAnnuels />, hidden: true, protected: false },
  { path: '/residence-principale', name: 'ResidencePrincipale', component: <ResidencePrincipale />, hidden: true, protected: false },
  { path: '/montant-loyer-mensuel', name: 'MontantLoyerMensuel', component: <MontantLoyerMensuel />, hidden: true, protected: false },
  { path: '/montant-credit-immobilier-mensuel', name: 'MontantCreditImmobilierMensuel', component: <MontantCreditImmobilierMensuel />, hidden: true, protected: false },
  { path: '/valeur-patrimoine-immobilier-net', name: 'ValeurPatrimoineImmobilierNet', component: <ValeurPatrimoineImmobilierNet />, hidden: true, protected: false },
  { path: '/montant-patrimoine-financier', name: 'MontantPatrimoineFinancier', component: <MontantPatrimoineFinancier />, hidden: true, protected: false },
  { path: '/montant-epargne-mensuel', name: 'MontantEpargneMensuel', component: <MontantEpargneMensuel />, hidden: true, protected: false },
  { path: '/besoin-epargne', name: 'BesoinEpargne', component: <BesoinEpargne />, hidden: true, protected: false },
  { path: '/besoin-investissement', name: 'BesoinInvestissement', component: <BesoinInvestissement />, hidden: true, protected: false },
  { path: '/placement-assurance-vie', name: 'PlacementAssuranceVie', component: <PlacementAssuranceVie />, hidden: true, protected: false },
  { path: '/perception-gain-risque', name: 'PerceptionGainRisque', component: <PerceptionGainRisque />, hidden: true, protected: false },
  { path: '/etf-capital-garanti', name: 'EtfCapitalGaranti', component: <EtfCapitalGaranti />, hidden: true, protected: false },
  { path: '/gestion-portefeuille', name: 'GestionPortefeuille', component: <GestionPortefeuille />, hidden: true, protected: false },
  { path: '/perte-placements', name: 'PertePlacements', component: <PertePlacements />, hidden: true, protected: false },
  { path: '/rapport-gains-pertes', name: 'RapportGainsPertes', component: <RapportGainsPertes />, hidden: true, protected: false },
  { path: '/rapport-gains-pertes-10-ans', name: 'RapportGainsPertes10Ans', component: <RapportGainsPertes10Ans />, hidden: true, protected: false },
  { path: '/perte-valeur-investissement', name: 'PerteValeurInvestissement', component: <PerteValeurInvestissement />, hidden: true, protected: false },
  { path: '/simulation-ready', name: 'SimulationReady', component: <SimulationReady />, hidden: true, protected: false },
  { path: '/creation-compte', name: 'CreationCompte', component: <CreationCompte />, hidden: true, protected: false },
  { path: '/notification-preferences', name: 'NotificationPreferences', component: <NotificationPreferences />, hidden: true, protected: false },
  { path: '/combined-risk-score', name: 'CombinedRiskScoreComponent', component: <CombinedRiskScoreComponent />, hidden: true, protected: false },
  { path: '/recommandation', name: 'Recommandation', component: <Recommandation />, hidden: true, protected: false },
  { path: '/contact-information', name: 'ContactInformation', component: <ContactInformation />, hidden: true, protected: false },
  { path: '/contact-information-phone', name: 'InformationsDeContactPhone', component: <InformationsDeContactPhone />, hidden: true, protected: false },
  { path: '/contact-permission', name: 'ContactPermission', component: <ContactPermission />, hidden: true, protected: false },
  { path: '/terms-and-conditions-confirmation', name: 'TermsAndConditionsConfirmation', component: <TermsAndConditionsConfirmation />, hidden: true, protected: false },
  { path: '/subscription-choice', name: 'SubscriptionChoice', component: <SubscriptionChoice />, hidden: true, protected: false },
  { path: '/conseiller-rappel', name: 'ConseillerRappel', component: <ConseillerRappel />, hidden: true, protected: false },
  { path: '/souscrire-en-ligne', name: 'SouscrireEnLigne', component: <SouscrireEnLigne />, hidden: true, protected: false },
  { path: '/subscriber-info', name: 'SubscriberInfoForm', component: <SubscriberInfoForm />, hidden: true, protected: true }, // Route protégée
];

const RoutesComponent: React.FC = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  return (
    <Routes>
      {/* Routes publiques d'authentification */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Mappage des routes existantes */}
      {routes.map((route, index) => {
        if (route.protected) {
          // Route protégée
          return (
            <Route
              key={index}
              path={route.path}
              element={
                user ? (
                  route.component
                ) : (
                  <Navigate to="/signin" replace state={{ from: route.path }} />
                )
              }
            />
          );
        } else {
          // Route publique
          return (
            <Route key={index} path={route.path} element={route.component} />
          );
        }
      })}

      {/* Redirection par défaut */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesComponent;
