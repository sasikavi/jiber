import { Action, RoomState, CONFIRMED_STATE } from '../../core/index'

export default function (
  dispatch: (action: Action) => any,
  getRoomState: (roomId: string) => RoomState,
  fetchRoomState: (roomId: string) => Promise<RoomState>
) {

  // if the room does not exist, create a new room using a snapshot from storage
  return async function ensureRoomState (roomId: string): Promise<RoomState> {
    const roomState = getRoomState(roomId)
    if (roomState) return roomState

    const savedRoomState = await fetchRoomState(roomId)
    dispatch({...savedRoomState, type: CONFIRMED_STATE, $hope: {roomId}})
    return getRoomState(roomId)
  }
}