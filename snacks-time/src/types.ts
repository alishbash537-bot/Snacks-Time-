export interface AddonOption {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'pizza' | 'burgers';
  description: string;
  price: number;
  prices?: {
    Small: number;
    Medium: number;
    Large: number;
  };
  addons?: AddonOption[];
  image: string;
  tags: string[];
  highlights?: string[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: 'Small' | 'Medium' | 'Large';
  selectedAddons?: string[];
  specialInstructions?: string;
}

export interface CravingsConsultation {
  dishName: string;
  poeticStory: string;
  pairingElixir: string;
  musicPairing: string;
  ritualNote: string;
  metadataStats: {
    calorieEstimate: string;
    sensoryKeywords: string;
  };
}
