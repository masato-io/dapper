export interface FatlineProps {
  curve: number[];
  width: number;
  color: string;
  speed: number;
}

export interface SparksProps {
  count?: number;
  colors?: readonly string[];
  radius?: number;
}

export interface LineData {
  color: string;
  width: number;
  speed: number;
  curve: number[];
}

export interface LineMaterialRef {
  dashOffset?: number;
}
