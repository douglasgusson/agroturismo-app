export type OpeningHours = {
  local_id: number;
  weekday: number;
  is_closed: boolean;
  start_time: string | null;
  end_time: string | null;
  start_pause_time: string | null;
  end_pause_time: string | null;
  id: number;
};

export type SpecialOpeningHours = {
  local_id: number;
  opening_date: string;
  description: string;
  is_closed: boolean;
  start_time: string | null;
  end_time: string | null;
  start_pause_time: string | null;
  end_pause_time: string | null;
  id: number;
};
