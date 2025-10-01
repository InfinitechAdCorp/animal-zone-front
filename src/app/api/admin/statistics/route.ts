// import { NextRequest, NextResponse } from 'next/server';

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// export async function GET(request: NextRequest) {
//   try {
//     const response = await fetch(`${BACKEND_URL}/api/admin/statistics`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json(
//         { message: data.message || 'Failed to fetch statistics' },
//         { status: response.status }
//       );
//     }

//     return NextResponse.json(data);
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: error.message || 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }