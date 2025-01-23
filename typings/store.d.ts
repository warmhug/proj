interface SystemState {
  loading: boolean;
  env: {
    version: string;
  };
}

interface StoreState {
  system: SystemState;
}
