"use client";
import React, { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Button } from "@/components/ui/button";
import FilterFranchiceModal from "@/components/forms-modals/franchice/FilterFranchice";
import DataTable from "@/components/Table/DataTable";
import Header from "@/components/Header";
import {
  useGetAllSeedTrails,
  useGetAllSeedTrailsStages,
} from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import NoData from "@/components/alerts/NoData";
import { SkeletonCard } from "@/components/SkeletonLoader";
import AddSeedTrailDataModal from "@/components/forms-modals/seed-trail-data/AddSeedTrailData";

const ManageSeedTrailData = () => {
  const { token } = useContextConsumer();
  const [isAddFranchiceModalOpen, setAddFranchiceModalOpen] =
    useState<boolean>(false);
  const [isUpdateFranchiceModalOpen, setUpdateFranchiceModalOpen] =
    useState<boolean>(false);
  const [viewStageAgainstSeed, setViewStageAgainstSeed] =
    useState<boolean>(false);
  const [trailUuid, setTrailUuid] = useState<string>("");

  // seed trails
  const { data: seedTrails, isLoading: loading } = useGetAllSeedTrails(token);
  const { data: trailStages } = useGetAllSeedTrailsStages(trailUuid, token);

  const handleView = (uuid: any) => {
    setViewStageAgainstSeed(true);
    setTrailUuid(uuid);
  };

  const SeedTrailColoumn: {
    Header: string;
    accessor: keyof SeedTrails | "actions";
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    {
      Header: "Seed variety name",
      accessor: "seed_variety_name",
      Cell: ({ row }: any) => row.original?.seed?.seed_variety_name || "N/A",
    },
    {
      Header: "Sowing date",
      accessor: "sowing_date",
      Cell: ({ row }: any) =>
        row.original.sowing_date.toString().split("T")[0] || "N/A",
    },
    { Header: "Tehsil", accessor: "tehsil" },
    { Header: "Latitude", accessor: "lat" },
    { Header: "Longitude", accessor: "lon" },
    { Header: "Est yield", accessor: "estimated_yield" },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex justify-end gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(row.original.uuid)}
            className="border-primary bg-primary/10 w-20 text-primary tracking-wider hover:text-primary/80"
          >
            Trial
          </Button>
        </div>
      ),
    },
  ];

  const stageColumns: {
    Header: string;
    accessor: keyof SeedTrailsStages;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    {
      Header: "Stage",
      accessor: "stage",
      Cell: ({ row }: any) => row.original?.stage || "N/A",
    },
    {
      Header: "Principle Stage",
      accessor: "sub_stage",
      Cell: ({ row }: any) => row.original?.sub_stage || "N/A",
    },
    { Header: "BBCH scale", accessor: "bbch_scale" },
    { Header: "Start day", accessor: "start_day" },
    { Header: "End day", accessor: "end_day" },
    { Header: "Kc", accessor: "kc" },
  ];

  return (
    <>
      <DashboardLayout>
        <Header title="Seed Trials" />
        {viewStageAgainstSeed && (
          <div className="flex justify-end my-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setUpdateFranchiceModalOpen(true)}
              className="border-primary bg-primary/10 w-40 text-primary tracking-wider hover:text-primary/80"
            >
              Update Trial Data
            </Button>
          </div>
        )}
        {!viewStageAgainstSeed &&
          (loading ? (
            <SkeletonCard className="w-full h-80" />
          ) : seedTrails.data && seedTrails.data.length > 0 ? (
            <div className="mt-8">
              <DataTable
                columns={SeedTrailColoumn}
                data={seedTrails.data as SeedTrailTableRow[]}
                paginate={seedTrails.data.length > 10}
              />
            </div>
          ) : (
            <NoData message="No Data Available" />
          ))}

        {viewStageAgainstSeed &&
          (loading ? (
            <SkeletonCard className="w-full h-80" />
          ) : trailStages && trailStages.data.length > 0 ? (
            <div className="mt-8">
              <DataTable
                columns={stageColumns}
                data={trailStages?.data as SeedTrailsStages[]}
                paginate={trailStages.data.length > 10}
              />
            </div>
          ) : (
            <NoData message="No Data Available" />
          ))}
      </DashboardLayout>
      <FilterFranchiceModal
        open={isAddFranchiceModalOpen}
        onOpenChange={setAddFranchiceModalOpen}
      />
      <AddSeedTrailDataModal
        open={isUpdateFranchiceModalOpen}
        onOpenChange={setUpdateFranchiceModalOpen}
        selectedTrailStages={trailStages?.data}
        trailUuid={trailUuid}
        mode="view"
      />
    </>
  );
};

export default ManageSeedTrailData;
