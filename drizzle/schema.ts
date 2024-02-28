import { pgTable, pgEnum, serial, text, foreignKey, integer, timestamp, date, unique, bigint, varchar } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const requestStatus = pgEnum("request_status", ['ERROR', 'SUCCESS', 'PENDING'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])
export const accountType = pgEnum("account_type", ['expense', 'revenue', 'equity', 'liability', 'asset'])
export const journalEntryType = pgEnum("journal_entry_type", ['credit', 'debit'])


export const accounts = pgTable("accounts", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	type: accountType("type").notNull(),
});

export const creditEntries = pgTable("credit_entries", {
	id: serial("id").primaryKey().notNull(),
	journalEntryId: integer("journal_entry_id").notNull().references(() => journalEntries.id),
	accountId: integer("account_id").notNull().references(() => accounts.id),
	amount: integer("amount").notNull(),
	summary: text("summary"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const debitEntries = pgTable("debit_entries", {
	id: serial("id").primaryKey().notNull(),
	journalEntryId: integer("journal_entry_id").notNull().references(() => journalEntries.id),
	accountId: integer("account_id").notNull().references(() => accounts.id),
	amount: integer("amount").notNull(),
	summary: text("summary"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const journalEntries = pgTable("journal_entries", {
	id: serial("id").primaryKey().notNull(),
	date: date("date").notNull(),
	partner: text("partner").notNull(),
	summary: text("summary"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const journalEntriesTmp = pgTable("journal_entries_tmp", {
	id: integer("id"),
	type: journalEntryType("type"),
	accountId: integer("account_id"),
	amount: integer("amount"),
	date: date("date"),
	partner: text("partner"),
	summary: text("summary"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
});

export const tenants = pgTable("tenants", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	name: varchar("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		tenantsNameKey: unique("tenants_name_key").on(table.name),
	}
});