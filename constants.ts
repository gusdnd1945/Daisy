import React from 'react';
import { Team } from './types';
import { T1Logo, GenGLogo, DplusKiaLogo, HLELogo, KTLogo, FOXLogo, KDFLogo, BROLogo, DRXLogo, NSRedForceLogo } from './components/icons/LckTeamLogos';

// LCK Teams
export const LCK_TEAMS: Team[] = [
  { name: 'T1', logo: React.createElement(T1Logo, { className: 'w-10 h-10' }) },
  { name: 'Gen.G', logo: React.createElement(GenGLogo, { className: 'w-10 h-10' }) },
  { name: 'Dplus KIA', logo: React.createElement(DplusKiaLogo, { className: 'w-10 h-10' }) },
  { name: 'Hanwha Life Esports', logo: React.createElement(HLELogo, { className: 'w-10 h-10' }) },
  { name: 'KT Rolster', logo: React.createElement(KTLogo, { className: 'w-10 h-10' }) },
  { name: 'FearX', logo: React.createElement(FOXLogo, { className: 'w-10 h-10' }) },
  { name: 'Kwangdong Freecs', logo: React.createElement(KDFLogo, { className: 'w-10 h-10' }) },
  { name: 'OKSavingsBank BRION', logo: React.createElement(BROLogo, { className: 'w-10 h-10' }) },
  { name: 'DRX', logo: React.createElement(DRXLogo, { className: 'w-10 h-10' }) },
  { name: 'Nongshim RedForce', logo: React.createElement(NSRedForceLogo, { className: 'w-10 h-10' }) },
];
