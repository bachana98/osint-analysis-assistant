export interface OsintInput {
  full_name: string;
  aliases: string;
  locations: string;
  handles: string;
  organizations: string;
  from: string;
  to: string;
  language_priority: string;
  depth: 'quick' | 'standard' | 'deep' | 'max';
  exclusions: string;
}

// v2/v3 Report JSON Types
export interface KeyFinding {
  text: string;
  confidence: number;
  sources: string[];
}

export interface Summary {
  key_findings: KeyFinding[];
  open_questions?: string[];
  overall_confidence: number;
}

export interface Biographical {
  birth_date: string | null;
  nationality: string;
  locations: string[];
}

export interface SocialHandle {
  platform: string;
  handle: string;
  url: string;
}

export interface DigitalPresence {
  websites: string[];
  social_handles: SocialHandle[];
}

export interface IdentityProfile {
  canonical_name: string;
  aliases: string[];
  transliteration_variants?: string[];
  biographical: Biographical;
  digital_presence: DigitalPresence;
}

export interface Affiliation {
  entity: string;
  role: string;
  from: string;
  to: string | null;
  sources: string[];
  confidence: number;
}

export interface TimelineEvent {
  date: string;
  event: string;
  category: 'career' | 'education' | 'media' | 'legal' | 'publication' | 'property' | 'other';
  sources: string[];
  confidence: number;
}

export interface Relationship {
  source_entity: string;
  target_entity: string;
  type: string;
  evidence: string[];
  confidence: number;
}

export interface Document {
  title: string;
  url: string;
  filetype: 'pdf' | 'doc' | 'xls' | 'ppt' | 'html';
  first_seen: string;
  publish_date: string | null;
  snippet: string;
}

export interface RiskSignal {
  signal: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  sources: string[];
}

export interface Threat {
  threat_type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
  confidence: number;
  sources: string[];
}

export interface Source {
  url: string;
  publisher: string;
  type: 'primary' | 'secondary';
  first_seen: string;
  last_seen?: string;
}

export interface Dork {
    engine: string;
    query: string;
    rationale: string;
    track: string;
}

export interface Property {
  label: string;
  address_text: string;
  admin_area: string;
  parcel_id: string | null;
  coordinates: {
    lat: number;
    lon: number;
    precision: 'building' | 'street' | 'district' | 'city';
  };
  osm: {
    way_id: number | null;
    node_id: number | null;
    relation_id: number | null;
  };
  footprint_area_sq_m: number | null;
  building_levels: number | null;
  source_evidence: string[];
  confidence: number;
  notes: string;
}

export interface ImagerySnapshot {
  provider: string;
  capture_date: string;
  url: string;
  cloud_cover_pct: number | null;
  resolution_m: number | null;
  observations: string[];
  confidence: number;
}

export interface ImageryEvidence {
  target_ref: string;
  snapshots: ImagerySnapshot[];
}

export interface GeoJsonFeature {
    type: "Feature";
    geometry: {
        type: "Polygon" | "Point" | "LineString";
        coordinates: any; 
    };
    properties: {
        label: string;
        source: string[];
        confidence: number;
    };
}

export interface GeoJsonArtifact {
    name: string;
    type: "FeatureCollection";
    features: GeoJsonFeature[];
}

export interface Report {
  summary: Summary;
  identity_profile: IdentityProfile;
  affiliations: Affiliation[];
  timeline: TimelineEvent[];
  relationships: Relationship[];
  documents: Document[];
  risk_signals: RiskSignal[];
  threat_assessment: Threat[];
  properties: Property[];
  imagery_evidence: ImageryEvidence[];
  geojson_artifacts: GeoJsonArtifact[];
  dork_pack: Dork[];
  source_registry: Source[];
  limitations: string[];
  next_steps: string[];
  detailed_report_text?: string;
}

// Graph JSON Types
export interface GraphNode {
  id: string;
  label: string;
  type: 'person' | 'org' | 'asset';
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: string;
  since: string | null;
  until: string | null;
  evidence: string[];
  confidence: number;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GeminiAnalysisResult {
    report: Report | null;
    graph: Graph | null;
    rawText: string;
}