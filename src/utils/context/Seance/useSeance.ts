import React from 'react';

import { SeanceContext } from './SeanceContext';

export const useSeance = () => React.useContext(SeanceContext);
