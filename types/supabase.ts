export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      designers: {
        Row: {
          created_at: string
          username: string
        }
        Insert: {
          created_at?: string
          username: string
        }
        Update: {
          created_at?: string
          username?: string
        }
        Relationships: []
      }
      designs: {
        Row: {
          created_at: string
          designer_name: string
          keyset_id: string
        }
        Insert: {
          created_at?: string
          designer_name: string
          keyset_id: string
        }
        Update: {
          created_at?: string
          designer_name?: string
          keyset_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "designs_designer_name_fkey"
            columns: ["designer_name"]
            isOneToOne: false
            referencedRelation: "designers"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "designs_keyset_id_fkey"
            columns: ["keyset_id"]
            isOneToOne: false
            referencedRelation: "keysets"
            referencedColumns: ["id"]
          }
        ]
      }
      keysets: {
        Row: {
          _eta: string | null
          _eta_precision: Database["public"]["Enums"]["date_precision"] | null
          _original_eta: string | null
          _original_eta_precision:
            | Database["public"]["Enums"]["date_precision"]
            | null
          _ship_date: string | null
          _ship_date_precision:
            | Database["public"]["Enums"]["date_precision"]
            | null
          colorway: string
          created_at: string
          details: string
          eta: string | null
          gb_end: string | null
          gb_launch: string | null
          ic_date: string
          id: string
          manufacturer: string | null
          notes: string | null
          original_eta: string | null
          profile: string
          revision: number | null
          sales_graph: string | null
          ship_date: string | null
          shipped: boolean | null
          status: Database["public"]["Enums"]["keyset_status"]
          thumbnail: string
        }
        Insert: {
          _eta?: string | null
          _eta_precision?: Database["public"]["Enums"]["date_precision"] | null
          _original_eta?: string | null
          _original_eta_precision?:
            | Database["public"]["Enums"]["date_precision"]
            | null
          _ship_date?: string | null
          _ship_date_precision?:
            | Database["public"]["Enums"]["date_precision"]
            | null
          colorway: string
          created_at?: string
          details: string
          eta?: string | null
          gb_end?: string | null
          gb_launch?: string | null
          ic_date: string
          id: string
          manufacturer?: string | null
          notes?: string | null
          original_eta?: string | null
          profile: string
          revision?: number | null
          sales_graph?: string | null
          ship_date?: string | null
          shipped?: boolean | null
          status?: Database["public"]["Enums"]["keyset_status"]
          thumbnail: string
        }
        Update: {
          _eta?: string | null
          _eta_precision?: Database["public"]["Enums"]["date_precision"] | null
          _original_eta?: string | null
          _original_eta_precision?:
            | Database["public"]["Enums"]["date_precision"]
            | null
          _ship_date?: string | null
          _ship_date_precision?:
            | Database["public"]["Enums"]["date_precision"]
            | null
          colorway?: string
          created_at?: string
          details?: string
          eta?: string | null
          gb_end?: string | null
          gb_launch?: string | null
          ic_date?: string
          id?: string
          manufacturer?: string | null
          notes?: string | null
          original_eta?: string | null
          profile?: string
          revision?: number | null
          sales_graph?: string | null
          ship_date?: string | null
          shipped?: boolean | null
          status?: Database["public"]["Enums"]["keyset_status"]
          thumbnail?: string
        }
        Relationships: [
          {
            foreignKeyName: "keysets_manufacturer_fkey"
            columns: ["manufacturer"]
            isOneToOne: false
            referencedRelation: "manufacturers"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "keysets_profile_fkey"
            columns: ["profile"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["name"]
          }
        ]
      }
      listings: {
        Row: {
          created_at: string
          gb_end: string | null
          keyset_id: string
          regions: string[] | null
          url: string | null
          vendor_name: string
        }
        Insert: {
          created_at?: string
          gb_end?: string | null
          keyset_id: string
          regions?: string[] | null
          url?: string | null
          vendor_name: string
        }
        Update: {
          created_at?: string
          gb_end?: string | null
          keyset_id?: string
          regions?: string[] | null
          url?: string | null
          vendor_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_keyset_id_fkey"
            columns: ["keyset_id"]
            isOneToOne: false
            referencedRelation: "keysets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_vendor_name_fkey"
            columns: ["vendor_name"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["name"]
          }
        ]
      }
      manufacturers: {
        Row: {
          created_at: string
          name: string
        }
        Insert: {
          created_at?: string
          name: string
        }
        Update: {
          created_at?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          name: string
        }
        Insert: {
          created_at?: string
          name: string
        }
        Update: {
          created_at?: string
          name?: string
        }
        Relationships: []
      }
      vendors: {
        Row: {
          country: string
          created_at: string
          name: string
        }
        Insert: {
          country: string
          created_at?: string
          name: string
        }
        Update: {
          country?: string
          created_at?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      apply_precision: {
        Args: {
          field: Database["public"]["Enums"]["date_precision"]
          source: string
        }
        Returns: string
      }
      get_status: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: Database["public"]["Enums"]["keyset_status"]
      }
    }
    Enums: {
      date_precision:
        | "microseconds"
        | "milliseconds"
        | "second"
        | "minute"
        | "hour"
        | "day"
        | "week"
        | "month"
        | "quarter"
        | "year"
        | "decade"
        | "century"
        | "millennium"
      keyset_status: "ic" | "future" | "ongoing" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
