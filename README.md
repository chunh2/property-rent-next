# Property Rent (Frontend Only)

- This project was developed using Next.js (React.js).
- This project requires the backend <code>property-rent-express</code>, developed using Express.js, to run properly.

### Software Requirements

- Node.js

### Installation

1. Install dependencies.

```bash
npm install
```

### env

1. Create the file <code>.env</code> at the root directory with the following content.

```bash
NEXT_PUBLIC_API_URL=

NEXT_PUBLIC_API_PROTOCOL=
NEXT_PUBLIC_API_HOSTNAME=
NEXT_PUBLIC_API_PORT=
```

2. The <code>NEXT_PUBLIC_API_URL</code> should be the URL of the backend.
3. The <code>NEXT_PUBLIC_API_PROTOCOL</code>, <code>NEXT_PUBLIC_API_HOSTNAME</code>, and <code>NEXT_PUBLIC_API_PORT</code> are content extracted from <code>NEXT_PUBLIC_API_URL</code>.

### For Development

1. Run the development server.

```bash
npm run dev
```

### For Production

1. Build the project for production.

```bash
npm run build
```

2. Preview the production build locally.

```bash
npm run preview
```
