type Link = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

interface ReduxProviderProps {
  children: React.ReactNode;
}

interface ExampleState {
  value: number;
}

type ReportCardProps = {
  title: string;
  value: number;
};

//table
interface DataTableProps<T extends object> {
  columns: Array<{
    Header: string;
    accessor: keyof T;
  }>;
  data: T[];
  paginate?: boolean;
}
//
interface Product {
  name: string;
  company_fk: string;
  category: string;
  sub_category: string;
  activeIngredient: string;
  concentration: string;
  units: string;
  subscribed?: boolean;
  packageWeight: string;
  weightUnit: string;
  packagingType: string;
  areaCovered: string;
  disease: string;
  price: string;
  description: string;
  images: string[];
}

interface Seed {
  id: number;
  seed_variety_name: string;
  trial_count: string;
  crop_category: string;
  crop: string;
  subscribed?: boolean;
  seedWeight: string;
  packageWeight: string;
  germination_percentage: string;
  maturity_percentage: string;
  minHarvestingDays: number;
  maxHavestingDays: number;
  suitable_region: string;
  package_type: string;
  price: string;
  description: string;
}

interface Manager {
  id: number;
  full_name: string;
  contact: string;
}

interface TrailData {
  id: number;
  stage: string;
  sub_stage: string;
  start_day: string;
  end_day: string;
  kc: string;
}

interface Franchise {
  id: number;
  full_name: string;
  franchiseName: string;
  contact: string;
  address: string;
  province: string;
  district: string;
  tehsil: string;
  active: boolean;
  remainingDays: number;
}

interface SeedTrails {
  id: number;
  seed_variety_name: string;
  sowing_date: string;
  tehsil: string;
  lat: string;
  lon: string;
  estimated_yield: string;
}

interface SeedTrailsStages {
  id: number;
  stage: string;
  sub_stage: string;
  bbch_scale: string;
  start_day: string;
  end_day: string;
  kc: string;
}

interface Suggestions {
  id: number;
  createdAt: string;
  first_query: string;
  response_viewed: boolean;
}

interface ProductTableRow extends Product {
  actions?: never;
}

interface SeedTableRow extends Seed {
  actions?: never;
}

interface ManagersTableRow extends Manager {
  actions?: never;
}

interface FranchiseTableRow extends Franchise {
  actions?: never;
}

interface SeedTrailTableRow extends SeedTrails {
  actions?: never;
}

interface SuggestionsTableActionRow extends Suggestions {
  viewed?: never;
  actions?: never;
}

type ProductColumnAccessor = keyof Product | "actions";

type SeedColumnAccessor = keyof Seed | "actions";

type ManagersColumnAccessor = keyof Manager | "actions";

type TrailDataColumnAccessor = keyof TrailData;

type FranchiseColumnAccessor = keyof Franchise | "actions" | "active";

type SuggestionsColumnAccessor = keyof Suggestions | "actions" | "viewed";

type AddProductModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "view" | "edit";
  productData?: any;
  subscribe?: boolean;
  currentFranchiseUuid?: string;
  loading?: boolean;
};

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

// Define types for context
interface ModeContextType {
  mode: "view" | "add" | "edit";
  setMode: (newMode: "view" | "add" | "edit") => void;
  token: string;
}

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  id: string;
}

interface RegisterCompanyPayload {
  companyName: string;
  email: string;
  contact: string;
  ntn: string;
  password: string;
  confirmPassword: string;
}

type ForgotPasswordFormValues =
  | { email: string }
  | { email: string; otp: string }
  | { email: string; newPassword: string; confirmPassword: string };

// chats types
interface Chat {
  uuid: string;
  message: string;
  is_query: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ActivateFranchisePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  franchiseUUIDs: string[];
  amount: number;
  onClose: any;
}

type PakistanData = {
  provinces: { label: string; value: string }[];
  [key: string]: { label: string; value: string }[];
};

interface Option {
  value: string;
  label: string;
}

interface MultiSelectContextProps {
  value: string[];
  onValueChange: (value: any) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  ref: React.RefObject<HTMLInputElement>;
  handleSelect: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

type InputField = {
  id: string;
  ingredient: string;
  concentration: number;
  unit: string | string[];
};
