"use client";
//Library
import Link from "next/link";
import { Edit, MoreHorizontal, Trash, Eye } from "lucide-react";
import React, { useCallback, useState } from "react";
//Library UI
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Drawer } from "antd";
import { Image } from "antd";
//Query
import { useDeleteArtist } from "@/app/query/artist/useDeleteArtist";
//Type
import { Artist } from "@/app/types/type";
import { AlertModal } from "@/app/backend/modal/alert-modal";

interface CellActionProps {
  data: Artist | any;
  onCloseDrawer?: any;
  openDrawer?: any;
}

const DrawerContent: React.FC<CellActionProps> = ({
  data,
  onCloseDrawer,
  openDrawer,
}) => {
  return (
    <Drawer title="Images" onClose={onCloseDrawer} open={openDrawer}>
      <div>
        {data?.images?.map((item: any, index: number) => (
          <div key={index} className="wrap m-1 flex">
            <Image
              className="h-full w-full object-cover"
              width={300}
              height={300}
              src={item.url}
            />
          </div>
        ))}
      </div>
    </Drawer>
  );
};

const MemoizedDrawerContent = React.memo(DrawerContent);

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { mutationDelete, isLoadingDelete } = useDeleteArtist();

  //Hàm xử lý xoá Artist
  const handleDeleteArtist = async () => {
    mutationDelete.mutate(data._id);
    setOpen(false);
  };

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDeleteArtist}
        loading={isLoadingDelete}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenDrawer(true)}>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <Link href={`/backend/artists/${data._id}`}>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <MemoizedDrawerContent
        data={data}
        onCloseDrawer={onCloseDrawer}
        openDrawer={openDrawer}
      />
    </>
  );
};
