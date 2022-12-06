import React from "react";
import Skeleton from "react-loading-skeleton";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonComp = () => {
  return (
    <div className="flex flex-wrap justify-between w-10/12 m-auto pt-20 sm:pt-0 ">
      <div className="w-64 rounded-md ">
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
      </div>
    </div>
  );
};

export default SkeletonComp;
