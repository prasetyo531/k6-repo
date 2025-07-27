# K6 Layered API Test Project

## Folder Structure

- `tests/scenario/`: Test flows and user behavior simulations
- `tests/endpoint/`: Service layer for HTTP requests
- `tests/utils/`: Utility functions (e.g., data generators)

## Usage

Run the test with:

```bash
k6 run --env BASE_URL=http://localhost:3000 tests/scenario/user-flow.test.js
