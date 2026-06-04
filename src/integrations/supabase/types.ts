export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          birthday: string | null
          focus_areas: string | null
          injuries: string | null
          inquiry: string
          status: Database["public"]["Enums"]["lead_status"]
          notes: string | null
          source: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          birthday?: string | null
          focus_areas?: string | null
          injuries?: string | null
          inquiry: string
          status?: Database["public"]["Enums"]["lead_status"]
          notes?: string | null
          source?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          birthday?: string | null
          focus_areas?: string | null
          injuries?: string | null
          inquiry?: string
          status?: Database["public"]["Enums"]["lead_status"]
          notes?: string | null
          source?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: Database["public"]["Enums"]["app_role"]
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: Database["public"]["Enums"]["app_role"]
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      lead_status: "new" | "contacted" | "converted" | "archived"
      app_role: "admin" | "trainer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
