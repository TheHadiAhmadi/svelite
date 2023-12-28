function respond(code, data: any = null, message = "Success", field = null) {
    const response:any = {}

    response.code = code ?? 200
    if(data) response.data = data 
    response.message = message;
    response.field = field

    return new Response(JSON.stringify(response))
}

export async function POST(event: any) {
    console.log("InsertOne and InsertMany")
    console.log("UpdateOne and UpdateMany")
    console.log("GetMany and GetOne based on input")
    console.log("RemoveOne and RemoveMany based on input")

    const data: any[] = []

    return respond(200, data)
}
