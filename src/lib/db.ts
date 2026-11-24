import Database from "better-sqlite3";
import path from "node:path";

const dbPath = process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "sonar-angaan.db");
const db = new Database(dbPath);
db.pragma("foreign_keys = ON");
db.exec(`
  CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, role TEXT NOT NULL CHECK(role IN ('ADMIN','CLIENT')), active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS client_profiles (id TEXT PRIMARY KEY, user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE, display_name TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS templates (id TEXT PRIMARY KEY, name TEXT NOT NULL, enabled INTEGER NOT NULL DEFAULT 1, capabilities TEXT NOT NULL DEFAULT '{}');
  CREATE TABLE IF NOT EXISTS themes (id TEXT PRIMARY KEY, name TEXT NOT NULL, primary_color TEXT NOT NULL, secondary_color TEXT NOT NULL, accent_color TEXT NOT NULL, typography TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, client_id TEXT NOT NULL REFERENCES client_profiles(id), slug TEXT UNIQUE NOT NULL, name TEXT NOT NULL, event_type TEXT, event_date TEXT, status TEXT NOT NULL DEFAULT 'DRAFT', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS event_configurations (id TEXT PRIMARY KEY, event_id TEXT UNIQUE NOT NULL REFERENCES events(id) ON DELETE CASCADE, draft_json TEXT NOT NULL, published_json TEXT, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS event_functions (id TEXT PRIMARY KEY, event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE, position INTEGER NOT NULL, name TEXT NOT NULL, starts_at TEXT, ends_at TEXT, location TEXT, description TEXT, image_url TEXT);
  CREATE TABLE IF NOT EXISTS media_assets (id TEXT PRIMARY KEY, event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE, path TEXT NOT NULL, alt TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS event_gallery (id TEXT PRIMARY KEY, event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE, media_id TEXT NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE, position INTEGER NOT NULL, is_cover INTEGER NOT NULL DEFAULT 0);
  CREATE INDEX IF NOT EXISTS events_client_id_idx ON events(client_id);
  CREATE INDEX IF NOT EXISTS functions_event_id_idx ON event_functions(event_id);
`);
export default db;
