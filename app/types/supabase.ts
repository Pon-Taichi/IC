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
      accounts: {
        Row: {
          id: number
          name: string
          type: Database["public"]["Enums"]["account_type"]
        }
        Insert: {
          id?: number
          name: string
          type: Database["public"]["Enums"]["account_type"]
        }
        Update: {
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["account_type"]
        }
        Relationships: []
      }
      credit_entries: {
        Row: {
          account_id: number
          amount: number
          created_at: string | null
          id: number
          journal_entry_id: number
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          account_id: number
          amount: number
          created_at?: string | null
          id?: number
          journal_entry_id: number
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: number
          amount?: number
          created_at?: string | null
          id?: number
          journal_entry_id?: number
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credit_entries_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_entries_journal_entry_id_fkey"
            columns: ["journal_entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          }
        ]
      }
      debit_entries: {
        Row: {
          account_id: number
          amount: number
          created_at: string | null
          id: number
          journal_entry_id: number
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          account_id: number
          amount: number
          created_at?: string | null
          id?: number
          journal_entry_id: number
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: number
          amount?: number
          created_at?: string | null
          id?: number
          journal_entry_id?: number
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "debit_entries_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debit_entries_journal_entry_id_fkey"
            columns: ["journal_entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          }
        ]
      }
      journal_entries: {
        Row: {
          created_at: string | null
          date: string
          id: number
          partner: string
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: number
          partner: string
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: number
          partner?: string
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      journal_entries_tmp: {
        Row: {
          account_id: number | null
          amount: number | null
          created_at: string | null
          date: string | null
          id: number | null
          partner: string | null
          summary: string | null
          type: Database["public"]["Enums"]["journal_entry_type"] | null
          updated_at: string | null
        }
        Insert: {
          account_id?: number | null
          amount?: number | null
          created_at?: string | null
          date?: string | null
          id?: number | null
          partner?: string | null
          summary?: string | null
          type?: Database["public"]["Enums"]["journal_entry_type"] | null
          updated_at?: string | null
        }
        Update: {
          account_id?: number | null
          amount?: number | null
          created_at?: string | null
          date?: string | null
          id?: number | null
          partner?: string | null
          summary?: string | null
          type?: Database["public"]["Enums"]["journal_entry_type"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_journal_entry: {
        Args: {
          param: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      account_type: "asset" | "liability" | "equity" | "revenue" | "expense"
      journal_entry_type: "debit" | "credit"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
