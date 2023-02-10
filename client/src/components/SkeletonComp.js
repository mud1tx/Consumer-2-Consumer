import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonComp = () => {
  return (
    <>
      <div className="flex border border-gray-200 rounded  gap-4 mb-4 flex-col ">
        <div className=" p-4">
          <Skeleton height={200} width={300} />
        </div>
        <div className="p-4">
          <Skeleton height={20} style={{ marginTop: 14 }} width={140} />
          <Skeleton height={20} style={{ marginTop: 14 }} width={160} />

          <div className="  flex justify-between ">
            <div>
              <Skeleton height={28} style={{ marginTop: 14 }} width={60} />
            </div>
            <div className="flex gap-4">
              <Skeleton height={28} style={{ marginTop: 14 }} width={80} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonComp;
