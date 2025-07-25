/**
 * Copyright 2024 SAP SE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const COMMITMENTID = "AddCommitment";
export const ADVANCEDVIEW = "advancedView";
export const CEREBROKEY = "PAYG Availability";
export const COMMITMENTRENEWALKEY = "Renewal";
export const PAYG_AZUNAWARE_KEY = "Whole Region";

//used to reset the last commitment to default values.
export const initialCommitmentObject = {
  id: COMMITMENTID,
  service_type: null,
  resource_name: null,
  availability_zone: null,
  amount: 0,
  unit: "",
  duration: "",
};

export const CustomZones = Object.freeze({
  ANY: "any",
  UNKNOWN: "unknown",
});

// Transfer commitment on project level
// Required are the following states:
// 1. A view where a transfer can be initiated
// 2. A view to copy the transfer token at the source project
// 3. A view to enter the transfer token at the target project
export const TransferStatus = Object.freeze({
  START: 1,
  VIEW: 2,
  RECEIVE: 3,
});

// Distinguish EditPanels with different purposes. F.e.: Max-Quota Editing or Commitment creation.
export const PanelType = Object.freeze({
  quota: { name: "quota" },
});

export const STRINGS = {
  autoscaling: "Autoscaling",
  availability_zones: "Availability Zones",
  block_storage: "Block Storage",
  bgpvpns: "BGP VPNs",
  bgpvpns_single: "BGP VPN",
  capacity: "Capacity",
  capacity_standard_hdd: "Capacity",
  ceph: "Ceph",
  cerebro: "Available HANA VM resources",
  cfm_share_capacity: "Share Capacity",
  compute: "Compute",
  compute_cascade_lake: "Compute (Cascade Lake)",
  compute_sapphire_rapids: "Compute (Sapphire Rapids)",
  cores: "Cores",
  cores_single: "Core",
  database: "Cloud Frame Manager",
  dns: "DNS",
  endpoints: "Endpoints",
  "endpoint-services": "Endpoint Services",
  floating_ips: "Floating IPs",
  floating_ips_single: "Floating IP",
  healthmonitors: "Health Monitors",
  healthmonitors_single: "Health Monitor",
  images: "Images",
  instances: "Instances",
  instances_single: "Instance",
  inconsistencies: "Inconsistencies",
  keppel: "Container Image Registry",
  l7policies: "L7 Policies",
  l7policies_single: "L7 Policy",
  listeners: "Listeners",
  listeners_single: "Listener",
  loadbalancers: "Load Balancers",
  loadbalancers_single: "Load Balancer",
  loadbalancing: "Loadbalancing",
  networking: "Network",
  network: "Network",
  networks: "Networks",
  networks_single: "Network",
  object_storage: "Object Storage",
  "object-store": "Object Storage",
  objectstore_region_3_hdd_capacity: "Object Storage Capacity",
  per_flavor: "Restricted Flavors",
  per_flavor_baremetal: "Baremetal Flavors",
  per_flavor_hana_cascade_lake: "HANA Flavors (Cascade Lake)",
  per_flavor_hana_sapphire_rapids: "HANA Flavors (Sapphire Rapids)",
  pools: "Pools",
  pools_single: "Pool",
  pool_members: "Pool Members",
  pool_members_single: "Pool Member",
  ports: "Ports",
  ports_single: "Port",
  ram: "RAM",
  rbac_policies: "RBAC Policies",
  rbac_policies_single: "RBAC Policy",
  recordsets: "Recordsets per Zone",
  routers: "Routers",
  routers_single: "Router",
  security_group_rules: "Security Group Rules",
  security_group_rules_single: "Security Group Rule",
  security_groups: "Security Groups",
  security_groups_single: "Security Group",
  server_groups: "Server Groups",
  server_groups_single: "Server Group",
  server_group_members: "Members per Server Group",
  server_group_members_single: "Member per Server Group",
  services: "Services",
  share_capacity: "Share Capacity",
  share_capacity_hypervisor_storage: "Share Capacity",
  shared_filesystem_storage: "Shared Filesystem Storage (Premium SSD)",
  share_networks: "Share Networks",
  share_networks_single: "Share Network",
  share_snapshots: "Share Snapshots",
  share_snapshots_single: "Share Snapshot",
  share_snapshots_hypervisor_storage: "Share Snapshots",
  share_snapshots_hypervisor_storage_single: "Share Snapshot",
  shares: "Shares",
  shares_single: "Share",
  shares_hypervisor_storage: "Shares",
  shares_hypervisor_storage_single: "Share",
  sharev2: "Shared Filesystem Storage (Premium SSD)",
  sharev2_hypervisor_storage: "Shared Filesystem Storage (Hypervisor Storage)",
  snapmirror_capacity: "Snapmirror Capacity",
  snapmirror_capacity_hypervisor_storage: "Snapmirror Capacity",
  snapshot_capacity: "Share Snapshot Capacity",
  snapshot_capacity_hypervisor_storage: "Share Snapshot Capacity",
  snapshots: "Snapshots",
  snapshots_single: "Snapshot",
  snapshots_standard_hdd: "Snapshots",
  snapshots_standard_hdd_single: "Snapshot",
  storage: "Storage",
  subnet_pools: "Subnet Pools",
  subnet_pools_single: "Subnet Pool",
  subnets: "Subnets",
  subnets_single: "Subnet",
  trunks: "Trunks",
  trunks_single: "Trunk",
  volumes: "Volumes",
  volumes_single: "Volume",
  volumes_standard_hdd: "Volumes",
  volumes_standard_hdd_single: "Volume",
  volumev2: "Block Storage (Premium SSD)",
  volumev2_standard_hdd: "Block Storage (Standard HDD)",
  zones: "Zones",
  zones_single: "Zone",
};
