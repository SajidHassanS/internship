"use client";
import React, { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus, Search } from "lucide-react";
import Link from "next/link";
import AddSeedModal from "@/components/forms-modals/seeds/AddSeed";
import { useGetSeedsStats } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { Toaster } from "react-hot-toast";

const Seeds = () => {
  const { token } = useContextConsumer();
  const [isAddSeedModalOpen, setAddSeedModalOpen] = useState(false);

  //stats data
  const { data: stats, isLoading: loading } = useGetSeedsStats(token);

  return (
    <>
      <Toaster />
      <DashboardLayout contentAtCenter>
        {loading ? (
          <SkeletonCard className="h-60 w-[30vw]" />
        ) : (
          <Card className="relative w-full py-6 lg:py-8 max-w-xl rounded-xl text-center bg-primary/10">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-6xl font-bold text-green-500">
                {stats?.data?.seedCountglobalList < 10
                  ? `0${stats?.data?.seedCountglobalList}`
                  : stats?.data?.seedCountglobalList || "00"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-md font-medium lg:pt-4 dark:text-farmacieGrey">
                Total Seeds in Global List
              </div>
            </CardContent>
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
          </Card>
        )}
        <Card
          className="w-full relative py-6 lg:py-8 max-w-xl lg:mt-4 rounded-xl text-center bg-muted/50 cards cursor-pointer"
          onClick={() => setAddSeedModalOpen((prev) => !prev)}
        >
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
              <CirclePlus className="h-8 w-8 mx-auto text-farmacieWhite" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl lg:text-4xl font-medium text-farmacieWhite">
              Add New Seed
            </div>
          </CardContent>
        </Card>
        <p className="text-sm text-left lg:pl-2 font-medium pb-4 w-full max-w-xl dark:text-farmacieGrey">
          Add seed to seed global list
        </p>
        <Link href="/seeds/manage-seeds" className="w-full mx-auto max-w-xl">
          <Card className="relative w-full py-6 lg:py-8 max-w-xl rounded-xl text-center bg-primary/10 dark:bg-farmacieLightSecondary border-2 border-primary">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
                <Search className="h-8 w-8 mx-auto text-primary text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl lg:text-4xl font-medium text-primary dark:text-green-500">
                Manage Seeds
              </div>
            </CardContent>
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
          </Card>
        </Link>
        <p className="text-sm !text-left lg:pl-2 font-medium pb-4 w-full max-w-xl dark:text-farmacieGrey">
          Search, filter and update seeds from the global list
        </p>
      </DashboardLayout>
      <AddSeedModal
        open={isAddSeedModalOpen}
        onOpenChange={setAddSeedModalOpen}
        mode="add"
      />
    </>
  );
};

export default Seeds;
