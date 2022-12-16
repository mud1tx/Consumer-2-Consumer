import React from "react";
import Skeleton from "react-loading-skeleton";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
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
              {/* <Skeleton height={28} style={{ marginTop: 14 }} width={40} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonComp;

{
  /* <div className="  ">
        <div className="">
          <Skeleton className="w-40 h-32" />
        </div>
        <div>
          <p>
            <Skeleton className="w-10px" />
          </p>
          <p>
            <Skeleton className="w-10px" />
          </p>
          <p>
            <Skeleton className="w-10px" />
          </p>
        </div>
        <div className="flex justify-between">
          <p className="w-20 text-2xl">
            <Skeleton />
          </p>
          <p className="w-20 text-2xl">
            <Skeleton />
          </p>
        </div>
      </div> */
}
