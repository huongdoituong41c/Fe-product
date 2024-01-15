export interface IBooking {
    booking_id: number,
    user_id: number,
    user: string,
    room_id: number,
    room: string,
    hotel_id: number,
    hotel: string,
    checkInDate: any,
    checkOutDate: any,
    numberOfGuests: number,
    numberOfRooms: number,
    totalPrice: number,
    status: string,
    createdAt: any,
    updatedAt: any
}

export interface IBookingReq {
    userId: number,
    roomId: number,
    checkInDate: any,
    checkOutDate: any,
    numberOfGuests: number,
    numberOfRooms: number
}
