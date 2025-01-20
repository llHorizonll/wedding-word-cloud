export type Database = {
  public: {
    Tables: {
      submissions: {
        Row: {
          id: number;
          name: string;
          words: string;
          created_at?: string;
        };
        Insert: {
          name: string;
          words: string;
        };
      };
    };
  };
}; 