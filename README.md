# General setup

### <a name="installing-node"></a> Installing node

---

```bash
# https://github.com/nvm-sh/nvm#install--update-script
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
# or any minor version for node18+
nvm install 24.16.0
nvm use 24.16.0
```

### <a name="installing-pnpm"></a> Install pnpm

---

```bash
# https://pnpm.io/installation
npm install -g pnpm
```

### <a name="installing-docker"></a> Install docker

---

```bash
# https://docs.docker.com/get-docker/
Use docker guide to install docker on your OS
```

# How to run

To run benchmarks locally just use current command.

> Note: make sure you will have docker running as long as benchmark script will create several docker containers with pg instance inside and run each orm library in new one. To prevent pg caching between different orm's running query

```bash
pnpm run start
```

# Sample runs

```text
cpu: Apple M4
runtime: node v24.16.0 (arm64-darwin)

benchmark       time (avg)             (min … max)       p75       p99      p995
-------------------------------------------------- -----------------------------
• select * from customer
-------------------------------------------------- -----------------------------
pg          241.79 µs/iter   (163.13 µs … 11.3 ms) 223.67 µs 764.67 µs   1.01 ms
pg:p        207.06 µs/iter (181.42 µs … 339.46 µs) 213.17 µs 236.79 µs 242.75 µs
postgresjs  218.91 µs/iter      (181 µs … 7.85 ms) 213.83 µs 243.67 µs 257.17 µs
drizzle     280.25 µs/iter   (237.21 µs … 2.99 ms) 278.63 µs 333.08 µs 464.13 µs
drizzle:p    258.5 µs/iter  (207.46 µs … 10.43 ms) 248.63 µs 288.21 µs 358.88 µs
knex        219.08 µs/iter   (181.92 µs … 2.67 ms) 225.38 µs 262.83 µs 280.54 µs
kysely      224.04 µs/iter   (186.29 µs … 5.18 ms)  220.5 µs 257.58 µs 291.54 µs
mikro       709.27 µs/iter   (499.08 µs … 5.31 ms) 685.21 µs   3.46 ms   3.64 ms
typeorm     291.17 µs/iter   (241.96 µs … 3.06 ms) 282.54 µs 531.63 µs   1.85 ms
prisma      297.83 µs/iter   (254.54 µs … 2.74 ms) 295.54 µs    372 µs 448.58 µs

summary for select * from customer
  pg:p
   1.06x faster than postgresjs
   1.06x faster than knex
   1.08x faster than kysely
   1.17x faster than pg
   1.25x faster than drizzle:p
   1.35x faster than drizzle
   1.41x faster than typeorm
   1.44x faster than prisma
   3.43x faster than mikro

• select * from customer where id = ?
-------------------------------------------------- -----------------------------
pg           11.47 ms/iter   (10.71 ms … 13.87 ms)  11.97 ms  13.87 ms  13.87 ms
pg:p         10.77 ms/iter      (10.47 ms … 11 ms)  10.81 ms     11 ms     11 ms
postgresjs   10.38 ms/iter   (10.07 ms … 11.81 ms)  10.42 ms  11.81 ms  11.81 ms
drizzle      25.18 ms/iter   (23.76 ms … 39.33 ms)  24.44 ms  39.33 ms  39.33 ms
drizzle:p    21.37 ms/iter   (21.07 ms … 23.09 ms)  21.38 ms  23.09 ms  23.09 ms
knex         12.43 ms/iter   (11.58 ms … 20.68 ms)   12.4 ms  20.68 ms  20.68 ms
kysely        11.9 ms/iter   (11.08 ms … 12.41 ms)  12.22 ms  12.41 ms  12.41 ms
mikro        13.49 ms/iter    (13.08 ms … 14.2 ms)  13.55 ms   14.2 ms   14.2 ms
typeorm      13.84 ms/iter   (13.47 ms … 14.46 ms)  13.87 ms  14.46 ms  14.46 ms
prisma       14.47 ms/iter   (13.74 ms … 15.62 ms)  14.83 ms  15.62 ms  15.62 ms

summary for select * from customer where id = ?
  postgresjs
   1.04x faster than pg:p
   1.11x faster than pg
   1.15x faster than kysely
   1.2x faster than knex
   1.3x faster than mikro
   1.33x faster than typeorm
   1.39x faster than prisma
   2.06x faster than drizzle:p
   2.43x faster than drizzle

• select * from customer where company_name ilike ?
-------------------------------------------------- -----------------------------
pg            7.86 ms/iter      (6.3 ms … 8.46 ms)   8.02 ms   8.46 ms   8.46 ms
pg:p           7.9 ms/iter    (7.29 ms … 28.51 ms)    7.5 ms  28.51 ms  28.51 ms
postgresjs   12.02 ms/iter   (11.09 ms … 17.64 ms)  12.24 ms  17.64 ms  17.64 ms
drizzle      15.03 ms/iter   (13.84 ms … 23.74 ms)  14.86 ms  23.74 ms  23.74 ms
drizzle:p     12.9 ms/iter   (12.24 ms … 14.34 ms)  13.47 ms  14.34 ms  14.34 ms
knex          8.62 ms/iter    (8.09 ms … 14.27 ms)   8.35 ms  14.27 ms  14.27 ms
kysely        8.18 ms/iter     (7.97 ms … 9.76 ms)    8.2 ms   9.76 ms   9.76 ms
mikro         9.33 ms/iter    (7.52 ms … 11.26 ms)   9.57 ms  11.26 ms  11.26 ms
typeorm       9.48 ms/iter    (8.74 ms … 17.25 ms)   9.41 ms  17.25 ms  17.25 ms
prisma        9.77 ms/iter    (9.41 ms … 17.53 ms)    9.7 ms  17.53 ms  17.53 ms

summary for select * from customer where company_name ilike ?
  pg
   1x faster than pg:p
   1.04x faster than kysely
   1.1x faster than knex
   1.19x faster than mikro
   1.21x faster than typeorm
   1.24x faster than prisma
   1.53x faster than postgresjs
   1.64x faster than drizzle:p
   1.91x faster than drizzle

• "SELECT * FROM employee"
-------------------------------------------------- -----------------------------
pg          139.53 µs/iter   (112.83 µs … 1.03 ms) 143.13 µs 158.21 µs 164.33 µs
pg:p        130.35 µs/iter  (90.33 µs … 238.46 µs) 134.92 µs 148.08 µs 151.71 µs
postgresjs  126.03 µs/iter    (94.58 µs … 3.01 ms) 129.13 µs 149.33 µs 156.08 µs
drizzle     176.63 µs/iter   (152.33 µs … 2.38 ms) 177.42 µs 196.71 µs 211.58 µs
drizzle:p   147.91 µs/iter   (121.92 µs … 2.01 ms) 148.58 µs 173.25 µs 374.21 µs
knex        144.48 µs/iter   (100.75 µs … 2.48 ms) 146.83 µs 168.42 µs  202.5 µs
kysely      139.67 µs/iter (118.67 µs … 238.13 µs) 143.13 µs  155.5 µs 159.71 µs
mikro        214.5 µs/iter   (183.08 µs … 2.81 ms) 209.08 µs 310.17 µs 554.25 µs
typeorm     167.39 µs/iter   (137.38 µs … 1.91 ms) 171.04 µs 199.71 µs 217.33 µs
prisma      176.06 µs/iter    (151.33 µs … 1.5 ms) 177.96 µs 200.38 µs 211.96 µs

summary for "SELECT * FROM employee"
  postgresjs
   1.03x faster than pg:p
   1.11x faster than pg
   1.11x faster than kysely
   1.15x faster than knex
   1.17x faster than drizzle:p
   1.33x faster than typeorm
   1.4x faster than prisma
   1.4x faster than drizzle
   1.7x faster than mikro

• select * from employee where id = ? left join reportee
-------------------------------------------------- -----------------------------
pg            1.36 ms/iter     (1.29 ms … 2.11 ms)   1.37 ms   1.41 ms   1.43 ms
pg:p          1.01 ms/iter      (913 µs … 1.25 ms)   1.06 ms   1.11 ms   1.13 ms
postgresjs    1.08 ms/iter   (880.96 µs … 3.59 ms)   1.07 ms   2.17 ms   2.34 ms
drizzle       3.43 ms/iter     (2.94 ms … 5.37 ms)   3.41 ms   5.05 ms   5.37 ms
drizzle:p     2.51 ms/iter     (1.96 ms … 6.73 ms)   2.51 ms   4.19 ms   4.88 ms
knex          1.61 ms/iter      (1.29 ms … 2.5 ms)   1.65 ms    1.8 ms   1.86 ms
kysely        1.67 ms/iter     (1.45 ms … 4.67 ms)   1.66 ms   2.86 ms   3.86 ms
mikro         2.13 ms/iter     (1.94 ms … 2.78 ms)   2.22 ms   2.63 ms   2.66 ms
typeorm       3.75 ms/iter     (3.09 ms … 5.91 ms)   3.78 ms   5.69 ms   5.91 ms
prisma        2.92 ms/iter     (2.77 ms … 3.69 ms)   2.93 ms   3.64 ms   3.69 ms

summary for select * from employee where id = ? left join reportee
  pg:p
   1.07x faster than postgresjs
   1.35x faster than pg
   1.59x faster than knex
   1.65x faster than kysely
   2.11x faster than mikro
   2.49x faster than drizzle:p
   2.89x faster than prisma
   3.4x faster than drizzle
   3.72x faster than typeorm

• SELECT * FROM supplier
-------------------------------------------------- -----------------------------
pg          147.07 µs/iter (119.54 µs … 834.25 µs) 151.63 µs 169.54 µs 175.88 µs
pg:p        143.14 µs/iter (121.96 µs … 304.83 µs)  146.5 µs 159.21 µs 165.96 µs
postgresjs  139.71 µs/iter      (114 µs … 4.09 ms) 140.88 µs 155.54 µs 160.75 µs
drizzle     184.93 µs/iter   (131.13 µs … 2.55 ms) 184.67 µs 260.79 µs 424.79 µs
drizzle:p   161.29 µs/iter       (136 µs … 2.7 ms) 162.58 µs 177.13 µs 185.42 µs
knex        155.32 µs/iter   (134.54 µs … 1.02 ms) 158.46 µs 173.04 µs 178.58 µs
kysely      151.59 µs/iter    (128.54 µs … 844 µs) 154.58 µs 172.96 µs 184.63 µs
mikro       292.13 µs/iter   (247.46 µs … 2.64 ms) 277.17 µs 474.25 µs    2.6 ms
typeorm     184.09 µs/iter   (164.96 µs … 1.74 ms) 186.13 µs 210.83 µs 214.67 µs
prisma      191.84 µs/iter   (165.46 µs … 2.18 ms) 193.33 µs 212.79 µs 219.42 µs

summary for SELECT * FROM supplier
  postgresjs
   1.02x faster than pg:p
   1.05x faster than pg
   1.09x faster than kysely
   1.11x faster than knex
   1.15x faster than drizzle:p
   1.32x faster than typeorm
   1.32x faster than drizzle
   1.37x faster than prisma
   2.09x faster than mikro

• select * from supplier where id = ?
-------------------------------------------------- -----------------------------
pg             3.9 ms/iter     (3.63 ms … 8.29 ms)   3.79 ms   6.96 ms   8.29 ms
pg:p           3.3 ms/iter     (3.21 ms … 3.43 ms)   3.32 ms   3.39 ms   3.43 ms
postgresjs     3.1 ms/iter     (2.15 ms … 4.12 ms)   3.26 ms    3.8 ms   4.12 ms
drizzle       7.44 ms/iter    (6.72 ms … 15.39 ms)   7.54 ms  15.39 ms  15.39 ms
drizzle:p     6.48 ms/iter    (5.78 ms … 11.14 ms)    6.7 ms  11.14 ms  11.14 ms
knex           3.8 ms/iter     (3.49 ms … 4.13 ms)   3.92 ms   4.08 ms   4.13 ms
kysely        3.79 ms/iter      (3.7 ms … 3.91 ms)   3.82 ms    3.9 ms   3.91 ms
mikro         4.36 ms/iter     (4.05 ms … 9.99 ms)   4.41 ms   6.77 ms   9.99 ms
typeorm       4.37 ms/iter     (3.37 ms … 5.14 ms)   4.41 ms   5.01 ms   5.14 ms
prisma        4.64 ms/iter     (4.28 ms … 5.47 ms)   4.68 ms   5.42 ms   5.47 ms

summary for select * from supplier where id = ?
  postgresjs
   1.07x faster than pg:p
   1.22x faster than kysely
   1.23x faster than knex
   1.26x faster than pg
   1.41x faster than mikro
   1.41x faster than typeorm
   1.5x faster than prisma
   2.09x faster than drizzle:p
   2.4x faster than drizzle

• SELECT * FROM product
-------------------------------------------------- -----------------------------
pg          187.21 µs/iter (164.25 µs … 853.92 µs) 191.46 µs 211.42 µs 222.79 µs
pg:p        186.93 µs/iter (145.25 µs … 253.17 µs) 190.17 µs 205.29 µs 210.38 µs
postgresjs  184.79 µs/iter   (157.29 µs … 3.42 ms) 182.17 µs 221.54 µs 422.83 µs
drizzle     245.09 µs/iter   (216.29 µs … 2.43 ms) 243.58 µs 274.71 µs    324 µs
drizzle:p      224 µs/iter   (204.54 µs … 1.76 ms) 223.33 µs 241.96 µs 285.38 µs
knex        198.33 µs/iter (178.83 µs … 920.75 µs) 201.25 µs 215.75 µs 220.13 µs
kysely       195.4 µs/iter (178.08 µs … 300.75 µs) 198.63 µs 213.54 µs 218.58 µs
mikro       639.46 µs/iter   (494.96 µs … 3.18 ms) 648.21 µs   3.02 ms   3.07 ms
typeorm     257.43 µs/iter   (222.17 µs … 2.07 ms) 249.96 µs 544.38 µs 663.46 µs
prisma      267.79 µs/iter   (210.04 µs … 2.45 ms) 265.13 µs 298.25 µs 428.38 µs

summary for SELECT * FROM product
  postgresjs
   1.01x faster than pg:p
   1.01x faster than pg
   1.06x faster than kysely
   1.07x faster than knex
   1.21x faster than drizzle:p
   1.33x faster than drizzle
   1.39x faster than typeorm
   1.45x faster than prisma
   3.46x faster than mikro

• SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?
-------------------------------------------------- -----------------------------
pg           11.84 ms/iter   (10.54 ms … 13.03 ms)  11.91 ms  13.03 ms  13.03 ms
pg:p          9.46 ms/iter    (8.56 ms … 14.58 ms)   9.61 ms  14.58 ms  14.58 ms
postgresjs    9.35 ms/iter    (9.14 ms … 11.11 ms)   9.36 ms  11.11 ms  11.11 ms
drizzle      25.45 ms/iter   (25.04 ms … 26.47 ms)  25.44 ms  26.47 ms  26.47 ms
drizzle:p    19.37 ms/iter   (18.49 ms … 23.62 ms)  20.38 ms  23.62 ms  23.62 ms
knex         12.62 ms/iter   (11.82 ms … 13.54 ms)  12.86 ms  13.54 ms  13.54 ms
kysely       12.18 ms/iter    (11.9 ms … 13.13 ms)  12.14 ms  13.13 ms  13.13 ms
mikro        18.54 ms/iter   (17.37 ms … 34.49 ms)  18.11 ms  34.49 ms  34.49 ms
typeorm      30.97 ms/iter   (26.83 ms … 57.84 ms)  29.24 ms  57.84 ms  57.84 ms
prisma       24.62 ms/iter   (22.61 ms … 35.97 ms)  24.12 ms  35.97 ms  35.97 ms

summary for SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?
  postgresjs
   1.01x faster than pg:p
   1.27x faster than pg
   1.3x faster than kysely
   1.35x faster than knex
   1.98x faster than mikro
   2.07x faster than drizzle:p
   2.63x faster than prisma
   2.72x faster than drizzle
   3.31x faster than typeorm

• SELECT * FROM product WHERE product.name ILIKE ?
-------------------------------------------------- -----------------------------
pg            8.56 ms/iter     (8.4 ms … 10.24 ms)   8.56 ms  10.24 ms  10.24 ms
pg:p          6.96 ms/iter    (5.05 ms … 17.99 ms)   7.02 ms  17.99 ms  17.99 ms
postgresjs    6.98 ms/iter    (4.81 ms … 12.67 ms)   6.97 ms  12.67 ms  12.67 ms
drizzle      15.16 ms/iter   (14.74 ms … 17.08 ms)  15.13 ms  17.08 ms  17.08 ms
drizzle:p    12.66 ms/iter   (10.07 ms … 14.17 ms)  12.77 ms  14.17 ms  14.17 ms
knex          8.32 ms/iter     (8.06 ms … 8.85 ms)   8.29 ms   8.85 ms   8.85 ms
kysely        8.15 ms/iter    (7.98 ms … 12.38 ms)   8.13 ms  12.38 ms  12.38 ms
mikro        11.19 ms/iter   (10.73 ms … 12.18 ms)  11.29 ms  12.18 ms  12.18 ms
typeorm       9.33 ms/iter    (8.98 ms … 10.08 ms)   9.62 ms  10.08 ms  10.08 ms
prisma        9.95 ms/iter    (9.68 ms … 11.07 ms)   9.97 ms  11.07 ms  11.07 ms

summary for SELECT * FROM product WHERE product.name ILIKE ?
  pg:p
   1x faster than postgresjs
   1.17x faster than kysely
   1.2x faster than knex
   1.23x faster than pg
   1.34x faster than typeorm
   1.43x faster than prisma
   1.61x faster than mikro
   1.82x faster than drizzle:p
   2.18x faster than drizzle

• select all order with sum and count
-------------------------------------------------- -----------------------------
pg            1.57 ms/iter      (1.3 ms … 2.88 ms)   1.61 ms   2.86 ms   2.88 ms
pg:p          3.38 ms/iter     (2.24 ms … 5.55 ms)   3.56 ms   5.15 ms   5.55 ms
postgresjs    3.09 ms/iter     (2.55 ms … 25.9 ms)   2.97 ms  20.62 ms   25.9 ms
drizzle       2.72 ms/iter     (1.96 ms … 4.81 ms)   3.03 ms    4.2 ms   4.81 ms
drizzle:p     3.28 ms/iter     (2.66 ms … 5.88 ms)    3.5 ms   5.75 ms   5.88 ms
knex          2.78 ms/iter     (2.29 ms … 3.38 ms)   3.01 ms   3.31 ms   3.38 ms
kysely        3.13 ms/iter     (2.33 ms … 4.35 ms)   3.27 ms   4.08 ms   4.35 ms
mikro        33.13 ms/iter   (28.36 ms … 49.63 ms)  34.67 ms  49.63 ms  49.63 ms
typeorm       6.73 ms/iter     (6.35 ms … 7.37 ms)   7.05 ms   7.37 ms   7.37 ms
prisma        8.14 ms/iter    (6.75 ms … 16.94 ms)   8.15 ms  16.94 ms  16.94 ms

summary for select all order with sum and count
  pg
   1.73x faster than drizzle
   1.77x faster than knex
   1.96x faster than postgresjs
   1.99x faster than kysely
   2.09x faster than drizzle:p
   2.15x faster than pg:p
   4.28x faster than typeorm
   5.17x faster than prisma
   21.06x faster than mikro

• select order with sum and count using limit with offset
-------------------------------------------------- -----------------------------
pg           25.35 ms/iter    (20.4 ms … 29.84 ms)   25.8 ms  29.84 ms  29.84 ms
pg:p          24.4 ms/iter   (23.22 ms … 25.93 ms)  25.04 ms  25.93 ms  25.93 ms
postgresjs   22.38 ms/iter   (21.52 ms … 22.92 ms)  22.57 ms  22.92 ms  22.92 ms
drizzle      41.98 ms/iter   (31.19 ms … 55.28 ms)  44.62 ms  55.28 ms  55.28 ms
drizle:p     36.55 ms/iter   (32.11 ms … 42.65 ms)  37.77 ms  42.65 ms  42.65 ms
knex         32.66 ms/iter   (27.14 ms … 42.26 ms)  35.59 ms  42.26 ms  42.26 ms
kysely       33.49 ms/iter   (31.63 ms … 35.35 ms)  34.68 ms  35.35 ms  35.35 ms
mikro       124.57 ms/iter (121.09 ms … 134.07 ms) 125.19 ms 134.07 ms 134.07 ms
typeorm      70.44 ms/iter   (62.11 ms … 76.34 ms)  72.24 ms  76.34 ms  76.34 ms
prisma       21.27 ms/iter    (15.2 ms … 47.46 ms)  23.53 ms  47.46 ms  47.46 ms

summary for select order with sum and count using limit with offset
  prisma
   1.05x faster than postgresjs
   1.15x faster than pg:p
   1.19x faster than pg
   1.54x faster than knex
   1.57x faster than kysely
   1.72x faster than drizle:p
   1.97x faster than drizzle
   3.31x faster than typeorm
   5.86x faster than mikro

• select order where order.id = ? with sum and count
-------------------------------------------------- -----------------------------
pg           10.51 ms/iter    (9.32 ms … 36.94 ms)  10.26 ms  36.94 ms  36.94 ms
pg:p          8.95 ms/iter    (8.13 ms … 16.23 ms)   8.69 ms  16.23 ms  16.23 ms
postgresjs    4.54 ms/iter     (3.97 ms … 6.29 ms)   4.66 ms   5.86 ms   6.29 ms
drizzle       23.5 ms/iter   (22.04 ms … 28.73 ms)  23.63 ms  28.73 ms  28.73 ms
drizzle:p     15.9 ms/iter   (15.19 ms … 18.13 ms)  15.96 ms  18.13 ms  18.13 ms
knex         10.85 ms/iter    (10.2 ms … 12.06 ms)  11.02 ms  12.06 ms  12.06 ms
kysely        11.6 ms/iter   (11.04 ms … 12.81 ms)  11.86 ms  12.81 ms  12.81 ms
mikro        27.96 ms/iter   (25.73 ms … 33.71 ms)  28.13 ms  33.71 ms  33.71 ms
prisma       20.94 ms/iter   (19.55 ms … 22.57 ms)  21.57 ms  22.57 ms  22.57 ms
typeorm      26.25 ms/iter   (24.35 ms … 33.35 ms)  26.41 ms  33.35 ms  33.35 ms

summary for select order where order.id = ? with sum and count
  postgresjs
   1.97x faster than pg:p
   2.32x faster than pg
   2.39x faster than knex
   2.56x faster than kysely
   3.5x faster than drizzle:p
   4.61x faster than prisma
   5.18x faster than drizzle
   5.78x faster than typeorm
   6.16x faster than mikro

• SELECT * FROM order_detail WHERE order_id = ?
-------------------------------------------------- -----------------------------
pg           72.85 ms/iter    (48.1 ms … 87.25 ms)  85.77 ms  87.25 ms  87.25 ms
pg:p         38.27 ms/iter    (37.1 ms … 38.64 ms)  38.38 ms  38.64 ms  38.64 ms
postgresjs   39.36 ms/iter    (38.43 ms … 43.1 ms)  39.66 ms   43.1 ms   43.1 ms
drizzle      133.2 ms/iter (114.68 ms … 182.18 ms)  143.7 ms 182.18 ms 182.18 ms
drizzle:p   126.57 ms/iter    (111 ms … 134.27 ms) 132.91 ms 134.27 ms 134.27 ms
knex        101.07 ms/iter  (95.36 ms … 103.67 ms) 102.62 ms 103.67 ms 103.67 ms
kysely       98.18 ms/iter   (76.41 ms … 104.9 ms) 103.15 ms  104.9 ms  104.9 ms
mikro       642.47 ms/iter  (359.89 ms … 733.1 ms) 687.73 ms  733.1 ms  733.1 ms
typeorm     183.29 ms/iter  (75.25 ms … 391.32 ms) 208.53 ms 391.32 ms 391.32 ms
prisma      101.81 ms/iter  (93.08 ms … 109.99 ms) 102.73 ms 109.99 ms 109.99 ms

summary for SELECT * FROM order_detail WHERE order_id = ?
  pg:p
   1.03x faster than postgresjs
   1.9x faster than pg
   2.57x faster than kysely
   2.64x faster than knex
   2.66x faster than prisma
   3.31x faster than drizzle:p
   3.48x faster than drizzle
   4.79x faster than typeorm
   16.79x faster than mikro
```
