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
pg             220 µs/iter   (160.83 µs … 1.23 ms) 223.96 µs 290.29 µs 310.79 µs
pg:p        210.84 µs/iter (186.13 µs … 461.21 µs) 216.04 µs 241.21 µs 251.04 µs
postgresjs  220.48 µs/iter    (180.08 µs … 1.9 ms) 217.25 µs 521.67 µs 582.08 µs
drizzle     282.76 µs/iter   (239.96 µs … 2.99 ms)  277.5 µs 427.21 µs   1.42 ms
drizzle:p    259.9 µs/iter   (219.71 µs … 3.93 ms) 255.54 µs 351.04 µs 562.33 µs
knex        222.79 µs/iter   (189.29 µs … 2.17 ms) 227.13 µs 257.25 µs 280.33 µs
kysely      227.98 µs/iter    (185.46 µs … 5.2 ms) 224.25 µs 255.33 µs 283.67 µs
mikro       499.99 µs/iter   (400.58 µs … 4.18 ms) 467.29 µs   2.72 ms   3.32 ms
typeorm     371.65 µs/iter   (322.21 µs … 2.23 ms) 364.63 µs   1.13 ms   1.48 ms
prisma      552.66 µs/iter    (479.5 µs … 7.89 ms) 551.17 µs 682.75 µs 856.17 µs

summary for select * from customer
  pg:p
   1.04x faster than pg
   1.05x faster than postgresjs
   1.06x faster than knex
   1.08x faster than kysely
   1.23x faster than drizzle:p
   1.34x faster than drizzle
   1.76x faster than typeorm
   2.37x faster than mikro
   2.62x faster than prisma

• select * from customer where id = ?
-------------------------------------------------- -----------------------------
pg           12.41 ms/iter    (12.2 ms … 12.71 ms)  12.47 ms  12.71 ms  12.71 ms
pg:p         11.08 ms/iter    (10.9 ms … 11.36 ms)  11.13 ms  11.36 ms  11.36 ms
postgresjs   10.48 ms/iter    (10.3 ms … 10.66 ms)  10.54 ms  10.66 ms  10.66 ms
drizzle      23.79 ms/iter   (21.92 ms … 26.82 ms)  23.84 ms  26.82 ms  26.82 ms
drizzle:p    21.56 ms/iter   (21.14 ms … 23.52 ms)  21.54 ms  23.52 ms  23.52 ms
knex         12.76 ms/iter    (10.91 ms … 13.2 ms)  12.94 ms   13.2 ms   13.2 ms
kysely       12.74 ms/iter    (12.45 ms … 14.3 ms)  12.78 ms   14.3 ms   14.3 ms
mikro        14.56 ms/iter   (14.29 ms … 15.27 ms)  14.65 ms  15.27 ms  15.27 ms
typeorm      14.35 ms/iter    (13.84 ms … 16.4 ms)  14.38 ms   16.4 ms   16.4 ms
prisma       18.53 ms/iter   (17.78 ms … 18.92 ms)  18.71 ms  18.92 ms  18.92 ms

summary for select * from customer where id = ?
  postgresjs
   1.06x faster than pg:p
   1.18x faster than pg
   1.22x faster than kysely
   1.22x faster than knex
   1.37x faster than typeorm
   1.39x faster than mikro
   1.77x faster than prisma
   2.06x faster than drizzle:p
   2.27x faster than drizzle

• select * from customer where company_name ilike ?
-------------------------------------------------- -----------------------------
pg            8.23 ms/iter      (6.7 ms … 8.72 ms)   8.53 ms   8.72 ms   8.72 ms
pg:p          7.63 ms/iter     (7.46 ms … 7.83 ms)   7.68 ms   7.83 ms   7.83 ms
postgresjs   12.15 ms/iter   (10.54 ms … 13.48 ms)  12.31 ms  13.48 ms  13.48 ms
drizzle      14.13 ms/iter   (13.11 ms … 16.06 ms)  14.41 ms  16.06 ms  16.06 ms
drizzle:p     13.5 ms/iter   (11.49 ms … 20.72 ms)  13.66 ms  20.72 ms  20.72 ms
knex          8.59 ms/iter     (8.2 ms … 10.73 ms)   8.71 ms  10.73 ms  10.73 ms
kysely        8.65 ms/iter    (6.97 ms … 13.48 ms)   8.71 ms  13.48 ms  13.48 ms
mikro         9.19 ms/iter      (8.19 ms … 9.9 ms)   9.35 ms    9.9 ms    9.9 ms
typeorm       9.73 ms/iter       (9.24 ms … 11 ms)   9.85 ms     11 ms     11 ms
prisma       12.44 ms/iter   (11.71 ms … 19.74 ms)  12.37 ms  19.74 ms  19.74 ms

summary for select * from customer where company_name ilike ?
  pg:p
   1.08x faster than pg
   1.13x faster than knex
   1.13x faster than kysely
   1.21x faster than mikro
   1.28x faster than typeorm
   1.59x faster than postgresjs
   1.63x faster than prisma
   1.77x faster than drizzle:p
   1.85x faster than drizzle

• "SELECT * FROM employee"
-------------------------------------------------- -----------------------------
pg          140.33 µs/iter (116.38 µs … 868.96 µs) 143.08 µs  158.5 µs 165.88 µs
pg:p        134.47 µs/iter (106.83 µs … 263.54 µs) 137.92 µs 154.88 µs 157.67 µs
drizzle     167.35 µs/iter   (138.58 µs … 2.15 ms) 169.13 µs 188.88 µs 196.75 µs
drizzle:p   149.36 µs/iter   (101.08 µs … 2.31 ms)    147 µs 389.46 µs 526.63 µs
knex        139.94 µs/iter   (113.46 µs … 1.36 ms) 144.33 µs 159.33 µs 166.38 µs
kysely      141.67 µs/iter   (119.38 µs … 1.03 ms) 144.79 µs 162.92 µs 168.04 µs
mikro       199.43 µs/iter   (147.08 µs … 1.84 ms) 198.63 µs 271.21 µs 381.29 µs
typeorm     180.52 µs/iter   (156.04 µs … 1.47 ms) 180.92 µs 226.63 µs 274.96 µs
prisma      243.12 µs/iter (215.04 µs … 373.42 µs) 247.54 µs 271.63 µs 279.58 µs

summary for "SELECT * FROM employee"
  pg:p
   1.04x faster than knex
   1.04x faster than pg
   1.05x faster than kysely
   1.11x faster than drizzle:p
   1.24x faster than drizzle
   1.34x faster than typeorm
   1.48x faster than mikro
   1.81x faster than prisma

• select * from employee where id = ? left join reportee
-------------------------------------------------- -----------------------------
pg             1.4 ms/iter     (1.31 ms … 3.08 ms)   1.41 ms   1.54 ms   1.59 ms
pg:p          1.11 ms/iter   (993.21 µs … 2.36 ms)   1.12 ms   1.92 ms   2.25 ms
drizzle       3.21 ms/iter      (3.1 ms … 4.44 ms)   3.21 ms   4.43 ms   4.44 ms
drizzle:p     2.53 ms/iter     (2.29 ms … 3.49 ms)   2.56 ms   2.77 ms   2.92 ms
knex          1.74 ms/iter     (1.59 ms … 2.88 ms)   1.76 ms   2.09 ms   2.67 ms
kysely        1.66 ms/iter     (1.39 ms … 2.71 ms)   1.67 ms   2.24 ms    2.7 ms
mikro         1.55 ms/iter     (1.17 ms … 2.43 ms)   1.58 ms   2.15 ms   2.23 ms
typeorm       3.69 ms/iter     (3.06 ms … 6.02 ms)   3.77 ms   4.74 ms   6.02 ms
prisma        3.23 ms/iter      (3.15 ms … 3.6 ms)   3.24 ms   3.49 ms    3.6 ms

summary for select * from employee where id = ? left join reportee
  pg:p
   1.26x faster than pg
   1.39x faster than mikro
   1.49x faster than kysely
   1.56x faster than knex
   2.27x faster than drizzle:p
   2.88x faster than drizzle
   2.89x faster than prisma
   3.31x faster than typeorm

• SELECT * FROM supplier
-------------------------------------------------- -----------------------------
pg           146.9 µs/iter (128.17 µs … 338.33 µs) 150.04 µs 164.46 µs 168.17 µs
pg:p        143.88 µs/iter  (119.58 µs … 309.5 µs) 147.17 µs    165 µs 168.21 µs
drizzle     174.54 µs/iter   (145.29 µs … 1.97 ms) 177.17 µs 195.17 µs 206.21 µs
drizzle:p   167.62 µs/iter   (138.29 µs … 3.52 ms)    165 µs 299.08 µs 394.79 µs
knex        148.35 µs/iter   (105.46 µs … 1.56 ms) 153.54 µs 188.21 µs 217.96 µs
kysely      141.19 µs/iter (106.17 µs … 275.75 µs) 146.46 µs 162.42 µs  168.5 µs
mikro       249.49 µs/iter   (193.67 µs … 2.47 ms) 243.96 µs 378.46 µs 590.54 µs
typeorm     200.41 µs/iter   (152.83 µs … 1.78 ms) 204.96 µs 238.38 µs 270.54 µs
prisma      296.58 µs/iter     (213.5 µs … 3.6 ms) 266.25 µs   1.25 ms   1.82 ms

summary for SELECT * FROM supplier
  kysely
   1.02x faster than pg:p
   1.04x faster than pg
   1.05x faster than knex
   1.19x faster than drizzle:p
   1.24x faster than drizzle
   1.42x faster than typeorm
   1.77x faster than mikro
   2.1x faster than prisma

• select * from supplier where id = ?
-------------------------------------------------- -----------------------------
pg            4.44 ms/iter    (2.97 ms … 28.15 ms)    3.9 ms   16.9 ms  28.15 ms
pg:p          3.39 ms/iter     (3.28 ms … 4.45 ms)   3.41 ms   3.82 ms   4.45 ms
drizzle       7.15 ms/iter    (5.45 ms … 11.99 ms)   7.42 ms  11.99 ms  11.99 ms
drizzle:p     6.82 ms/iter        (6 ms … 8.36 ms)   6.85 ms   8.36 ms   8.36 ms
knex          4.04 ms/iter     (3.74 ms … 5.38 ms)   4.08 ms   4.61 ms   5.38 ms
kysely        3.94 ms/iter     (3.83 ms … 4.19 ms)   3.96 ms   4.12 ms   4.19 ms
mikro         4.58 ms/iter     (3.64 ms … 5.04 ms)   4.63 ms   4.99 ms   5.04 ms
typeorm       4.56 ms/iter     (4.38 ms … 5.99 ms)   4.56 ms   5.94 ms   5.99 ms
prisma        5.96 ms/iter     (5.34 ms … 7.27 ms)      6 ms   7.27 ms   7.27 ms

summary for select * from supplier where id = ?
  pg:p
   1.16x faster than kysely
   1.19x faster than knex
   1.31x faster than pg
   1.34x faster than typeorm
   1.35x faster than mikro
   1.76x faster than prisma
   2.01x faster than drizzle:p
   2.11x faster than drizzle

• SELECT * FROM product
-------------------------------------------------- -----------------------------
pg           180.3 µs/iter (138.88 µs … 341.08 µs) 184.92 µs 207.79 µs 226.13 µs
pg:p        183.04 µs/iter (160.79 µs … 333.29 µs) 186.08 µs 200.38 µs 203.33 µs
drizzle     243.28 µs/iter   (194.92 µs … 1.96 ms)    243 µs 294.38 µs 360.71 µs
drizzle:p   228.47 µs/iter   (203.13 µs … 2.53 ms) 226.54 µs 286.71 µs 350.96 µs
knex        192.14 µs/iter   (164.33 µs … 2.39 ms) 192.42 µs  349.5 µs 542.75 µs
kysely      189.81 µs/iter  (148.5 µs … 315.13 µs)  193.5 µs 223.88 µs 234.04 µs
mikro       495.42 µs/iter      (430.75 µs … 3 ms)  478.5 µs   2.43 ms   2.51 ms
typeorm     301.98 µs/iter   (244.96 µs … 1.79 ms) 301.33 µs 508.54 µs   1.13 ms
prisma      438.61 µs/iter   (366.5 µs … 11.07 ms) 429.46 µs 639.21 µs 858.13 µs

summary for SELECT * FROM product
  pg
   1.02x faster than pg:p
   1.05x faster than kysely
   1.07x faster than knex
   1.27x faster than drizzle:p
   1.35x faster than drizzle
   1.67x faster than typeorm
   2.43x faster than prisma
   2.75x faster than mikro

• SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?
-------------------------------------------------- -----------------------------
pg           12.87 ms/iter   (11.36 ms … 17.04 ms)  13.23 ms  17.04 ms  17.04 ms
pg:p          9.16 ms/iter    (7.74 ms … 12.17 ms)   9.49 ms  12.17 ms  12.17 ms
drizzle      24.34 ms/iter   (20.59 ms … 25.79 ms)   24.6 ms  25.79 ms  25.79 ms
drizzle:p    20.76 ms/iter   (17.22 ms … 40.36 ms)  21.16 ms  40.36 ms  40.36 ms
knex         14.41 ms/iter    (12.79 ms … 21.8 ms)  14.39 ms   21.8 ms   21.8 ms
kysely       14.04 ms/iter   (12.64 ms … 19.43 ms)  14.31 ms  19.43 ms  19.43 ms
mikro        21.98 ms/iter   (16.27 ms … 42.95 ms)  23.77 ms  42.95 ms  42.95 ms
typeorm      30.05 ms/iter   (27.51 ms … 33.56 ms)  30.67 ms  33.56 ms  33.56 ms
prisma       28.43 ms/iter   (26.96 ms … 36.21 ms)  28.48 ms  36.21 ms  36.21 ms

summary for SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?
  pg:p
   1.4x faster than pg
   1.53x faster than kysely
   1.57x faster than knex
   2.27x faster than drizzle:p
   2.4x faster than mikro
   2.66x faster than drizzle
   3.1x faster than prisma
   3.28x faster than typeorm

• SELECT * FROM product WHERE product.name ILIKE ?
-------------------------------------------------- -----------------------------
pg            9.02 ms/iter    (8.44 ms … 11.53 ms)   9.03 ms  11.53 ms  11.53 ms
pg:p          7.39 ms/iter    (6.23 ms … 16.02 ms)   7.33 ms  16.02 ms  16.02 ms
drizzle       15.5 ms/iter   (13.69 ms … 26.82 ms)  15.42 ms  26.82 ms  26.82 ms
drizzle:p    14.25 ms/iter    (12.5 ms … 22.86 ms)  14.27 ms  22.86 ms  22.86 ms
knex          9.86 ms/iter     (7.61 ms … 36.7 ms)   9.34 ms   36.7 ms   36.7 ms
kysely        9.39 ms/iter    (8.56 ms … 11.56 ms)    9.4 ms  11.56 ms  11.56 ms
mikro         10.8 ms/iter   (10.03 ms … 13.16 ms)  10.93 ms  13.16 ms  13.16 ms
typeorm      10.11 ms/iter    (9.86 ms … 10.85 ms)  10.22 ms  10.85 ms  10.85 ms
prisma       12.13 ms/iter   (11.68 ms … 17.82 ms)  12.04 ms  17.82 ms  17.82 ms

summary for SELECT * FROM product WHERE product.name ILIKE ?
  pg:p
   1.22x faster than pg
   1.27x faster than kysely
   1.33x faster than knex
   1.37x faster than typeorm
   1.46x faster than mikro
   1.64x faster than prisma
   1.93x faster than drizzle:p
   2.1x faster than drizzle

• select all order with sum and count
-------------------------------------------------- -----------------------------
pg            1.42 ms/iter     (1.22 ms … 3.89 ms)   1.32 ms   2.62 ms    2.8 ms
pg:p          3.61 ms/iter      (2.28 ms … 5.3 ms)    4.1 ms   5.27 ms    5.3 ms
drizzle       4.69 ms/iter    (2.73 ms … 14.83 ms)   5.11 ms  13.23 ms  14.83 ms
drizzle:p     3.21 ms/iter      (2.1 ms … 7.86 ms)   3.72 ms   7.72 ms   7.86 ms
knex          3.54 ms/iter     (2.88 ms … 7.84 ms)   3.88 ms    7.1 ms   7.84 ms
kysely        3.65 ms/iter      (2.5 ms … 5.61 ms)   3.94 ms   5.47 ms   5.61 ms
mikro        22.36 ms/iter   (19.53 ms … 24.03 ms)  23.58 ms  24.03 ms  24.03 ms
typeorm       9.44 ms/iter    (8.54 ms … 13.62 ms)   9.53 ms  13.62 ms  13.62 ms
prisma       19.99 ms/iter    (15.8 ms … 22.22 ms)  21.37 ms  22.22 ms  22.22 ms

summary for select all order with sum and count
  pg
   2.26x faster than drizzle:p
   2.49x faster than knex
   2.54x faster than pg:p
   2.57x faster than kysely
   3.3x faster than drizzle
   6.64x faster than typeorm
   14.07x faster than prisma
   15.74x faster than mikro

• select order with sum and count using limit with offset
-------------------------------------------------- -----------------------------
pg           24.44 ms/iter   (23.48 ms … 25.44 ms)  24.62 ms  25.44 ms  25.44 ms
pg:p         23.49 ms/iter   (21.31 ms … 24.11 ms)  23.72 ms  24.11 ms  24.11 ms
drizzle      42.54 ms/iter   (34.05 ms … 49.96 ms)  44.22 ms  49.96 ms  49.96 ms
drizle:p      38.3 ms/iter   (37.55 ms … 43.13 ms)  38.32 ms  43.13 ms  43.13 ms
knex         28.83 ms/iter   (21.89 ms … 40.68 ms)  28.95 ms  40.68 ms  40.68 ms
kysely       26.25 ms/iter    (20.3 ms … 59.39 ms)  26.57 ms  59.39 ms  59.39 ms
mikro        105.5 ms/iter  (78.15 ms … 161.72 ms) 111.82 ms 161.72 ms 161.72 ms
typeorm      87.77 ms/iter  (74.62 ms … 108.22 ms)  93.04 ms 108.22 ms 108.22 ms
prisma      107.12 ms/iter   (85.61 ms … 131.5 ms)  113.8 ms  131.5 ms  131.5 ms

summary for select order with sum and count using limit with offset
  pg:p
   1.04x faster than pg
   1.12x faster than kysely
   1.23x faster than knex
   1.63x faster than drizle:p
   1.81x faster than drizzle
   3.74x faster than typeorm
   4.49x faster than mikro
   4.56x faster than prisma

• select order where order.id = ? with sum and count
-------------------------------------------------- -----------------------------
pg           10.76 ms/iter   (10.22 ms … 14.18 ms)  10.82 ms  14.18 ms  14.18 ms
pg:p          9.09 ms/iter    (8.68 ms … 10.25 ms)   9.17 ms  10.25 ms  10.25 ms
drizzle      21.39 ms/iter   (20.19 ms … 28.53 ms)  22.32 ms  28.53 ms  28.53 ms
drizzle:p    16.33 ms/iter   (15.18 ms … 18.85 ms)  16.75 ms  18.85 ms  18.85 ms
knex         12.25 ms/iter    (11.5 ms … 15.04 ms)  12.53 ms  15.04 ms  15.04 ms
kysely       13.26 ms/iter    (12.7 ms … 14.79 ms)  13.37 ms  14.79 ms  14.79 ms
mikro        26.96 ms/iter   (25.76 ms … 28.92 ms)  27.28 ms  28.92 ms  28.92 ms
prisma       21.39 ms/iter   (19.63 ms … 26.89 ms)  21.59 ms  26.89 ms  26.89 ms
typeorm      26.36 ms/iter   (25.03 ms … 28.63 ms)  26.77 ms  28.63 ms  28.63 ms

summary for select order where order.id = ? with sum and count
  pg:p
   1.18x faster than pg
   1.35x faster than knex
   1.46x faster than kysely
   1.8x faster than drizzle:p
   2.35x faster than prisma
   2.35x faster than drizzle
   2.9x faster than typeorm
   2.97x faster than mikro

• SELECT * FROM order_detail WHERE order_id = ?
-------------------------------------------------- -----------------------------
pg           69.68 ms/iter   (59.32 ms … 91.94 ms)  73.57 ms  91.94 ms  91.94 ms
pg:p         39.51 ms/iter   (39.05 ms … 43.68 ms)  39.36 ms  43.68 ms  43.68 ms
drizzle     122.91 ms/iter  (109.78 ms … 170.1 ms) 126.75 ms  170.1 ms  170.1 ms
drizzle:p   118.45 ms/iter  (98.15 ms … 142.92 ms) 134.88 ms 142.92 ms 142.92 ms
knex         89.21 ms/iter  (68.95 ms … 100.86 ms)  97.27 ms 100.86 ms 100.86 ms
kysely       84.39 ms/iter   (67.35 ms … 97.82 ms)  93.67 ms  97.82 ms  97.82 ms
mikro        94.54 ms/iter   (93.56 ms … 99.77 ms)   94.2 ms  99.77 ms  99.77 ms
typeorm     129.39 ms/iter   (82.53 ms … 201.3 ms) 154.08 ms  201.3 ms  201.3 ms
prisma      110.37 ms/iter (100.96 ms … 114.35 ms) 114.13 ms 114.35 ms 114.35 ms

summary for SELECT * FROM order_detail WHERE order_id = ?
  pg:p
   1.76x faster than pg
   2.14x faster than kysely
   2.26x faster than knex
   2.39x faster than mikro
   2.79x faster than prisma
   3x faster than drizzle:p
   3.11x faster than drizzle
   3.27x faster than typeorm
```

