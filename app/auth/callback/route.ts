
export async function GET(request:Request){
    const {searchParams,origin}=new URL(request.url)
    const code=searchParams.get('code')

    const next=searchParams.get('next')?? '/'
    console.log('callback')
}