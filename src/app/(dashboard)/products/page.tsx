"use client";

import React, { useMemo, useState } from "react";
import { CirclePlus, Search } from "lucide-react";
import ReportCard from "@/components/ReportCard";
import { productsReportsTitles } from "@/constant/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddProductModal from "@/components/forms-modals/products/AddProduct";
import DashboardLayout from "../dashboard-layout";
import Link from "next/link";
import { useGetProductStats } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const { token } = useContextConsumer();
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);

  //stats data
  const { data: stats, isLoading: loading } = useGetProductStats(token);

  const reportsWithStats = useMemo(() => {
    return productsReportsTitles.map((report) => ({
      title: report.title,
      value:
        stats?.data?.[report.key] < 10
          ? `0${stats.data[report.key]}`
          : stats?.data?.[report.key] || "00",
    }));
  }, [stats]);

  return (
    <>
      <Toaster />
      <DashboardLayout contentAtCenter>
        <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-7xl mx-auto">
          {loading ? (
            <SkeletonCard className="h-60 w-full col-span-3" />
          ) : (
            reportsWithStats.map((report, index) => (
              <ReportCard
                key={index}
                title={report.title}
                value={report.value}
              />
            ))
          )}
        </div>
        <Card
          className="w-full relative py-6 lg:py-8 max-w-xl lg:mt-4 rounded-xl text-center bg-muted/50 hover:bg-background cards cursor-pointer"
          onClick={() => setAddProductModalOpen((prev) => !prev)}
        >
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
              <CirclePlus className="h-8 w-8 mx-auto text-farmacieWhite" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl lg:text-4xl font-medium text-farmacieWhite">
              Add New Product
            </div>
          </CardContent>
        </Card>
        <p className="max-w-xl text-sm lg:pl-2 font-medium pb-4 dark:text-farmacieGrey">
          Add fertilizer, pesticide or nutrients to company’s global list so
          that franchise can subscribe
        </p>
        <Link href="/products/all-products" className="w-full mx-auto max-w-xl">
          <Card className="relative w-full py-6 lg:py-8 max-w-xl rounded-xl text-center bg-primary/10 dark:bg-farmacieLightSecondary border-2 border-primary">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
                <Search className="h-8 w-8 mx-auto text-primary text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl lg:text-4xl font-medium text-primary dark:text-green-500">
                Get Products
              </div>
            </CardContent>
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
          </Card>
        </Link>
        <p className="max-w-xl text-sm lg:pl-1 font-medium pb-4 dark:text-farmacieGrey">
          Search, filter and update product from the compnay’s global list to
          view and update
        </p>
      </DashboardLayout>
      <AddProductModal
        open={isAddProductModalOpen}
        onOpenChange={setAddProductModalOpen}
        mode="add"
      />
    </>
  );
}
