import { Database, DB, readDB, User, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request:NextRequest) => {
  readDB();
  const rooms = request.nextUrl.searchParams.get('rooms');
  let room = DB.rooms;
  if(rooms) {
    room = room.filter((r) => r.room === rooms);
  }
  return NextResponse.json({
    ok: true,
    rooms: room,
    totalRooms: room.length
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
  if(!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  readDB();
  const body = await request.json();

  if(!body.roomName) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${body.roomName} already exists`,
      },
      { status: 400 }
    );
  }


  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${body.roomName} has been created`,
  });
};
