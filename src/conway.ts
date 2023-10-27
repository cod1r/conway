let cvs = document.querySelector('canvas') as HTMLCanvasElement;
let ctx = cvs.getContext("2d");
const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 500;
const BUFFER_HEIGHT = 100;
const BUFFER_WIDTH = 100;
const NODE_WIDTH = CANVAS_WIDTH / BUFFER_WIDTH;
const NODE_HEIGHT = CANVAS_HEIGHT / BUFFER_HEIGHT;
let bytes = new Uint8ClampedArray(BUFFER_HEIGHT * BUFFER_WIDTH * 3 /* times 3 because of RGB */);
const DEAD = 1;
const ALIVE = 0;
for (let i = 0; i < BUFFER_HEIGHT * BUFFER_WIDTH * 3; ++i) {
	bytes[i] = DEAD;
}
main();
function main() {
	generate_seed();
	requestAnimationFrame(conway);
}
function generate_seed() {
	let number_of_alive = Math.ceil(Math.random() * (BUFFER_HEIGHT * BUFFER_WIDTH));
	for (let i = 0; i < number_of_alive; ++i) {
		let col = Math.floor(Math.random() * BUFFER_WIDTH);
		let row = Math.floor(Math.random() * BUFFER_HEIGHT);
		let curr_first = bytes[(row * BUFFER_WIDTH * 3) + (col * 3)] = ALIVE;
		let curr_second = bytes[(row * BUFFER_WIDTH * 3) + (col * 3) + 1] = ALIVE;
		let curr_third = bytes[(row * BUFFER_WIDTH * 3) + (col * 3) + 2] = ALIVE;
		ctx.beginPath();
		ctx.fillStyle = `rgb(${curr_first * 255} ${curr_second * 255} ${curr_third * 255})`;
		ctx.rect(col * NODE_WIDTH, row * NODE_HEIGHT, NODE_WIDTH, NODE_HEIGHT);
		ctx.fill();
	}
}
function apply_conway_rules() {
	for (let r = 0; r < BUFFER_HEIGHT; ++r) {
		for (let c = 0; c < BUFFER_WIDTH; ++c) {
			let live_neighbors = 0;
			if (r < BUFFER_HEIGHT - 1) {
				let first = bytes[((r+1) * BUFFER_WIDTH * 3) + (c*3)];
				let second = bytes[((r+1) * BUFFER_WIDTH * 3) + (c*3) + 1];
				let third = bytes[((r+1) * BUFFER_WIDTH * 3) + (c*3) + 2];
				if (first == ALIVE || second == ALIVE || third == ALIVE) {
					live_neighbors += 1;
				}
			}
			if (c < BUFFER_WIDTH - 1) {
				let first = bytes[((r) * BUFFER_WIDTH * 3) + ((c+1)*3)];
				let second = bytes[((r) * BUFFER_WIDTH * 3) + ((c+1)*3) + 1];
				let third = bytes[((r) * BUFFER_WIDTH * 3) + ((c+1)*3) + 2];
				if (first == ALIVE || second == ALIVE || third == ALIVE) {
					live_neighbors += 1;
				}
			}
			if (r < BUFFER_HEIGHT - 1 && c < BUFFER_WIDTH - 1) {
				let first = bytes[((r+1) * BUFFER_WIDTH * 3) + ((c+1)*3)];
				let second = bytes[((r+1) * BUFFER_WIDTH * 3) + ((c+1)*3) + 1];
				let third = bytes[((r+1) * BUFFER_WIDTH * 3) + ((c+1)*3) + 2];
				if (first == ALIVE || second == ALIVE || third == ALIVE) {
					live_neighbors += 1;
				}
			}
			if (r > 0) {
				let first = bytes[((r-1) * BUFFER_WIDTH * 3) + ((c)*3)];
				let second = bytes[((r-1) * BUFFER_WIDTH * 3) + ((c)*3) + 1];
				let third = bytes[((r-1) * BUFFER_WIDTH * 3) + ((c)*3) + 2];
				if (first == ALIVE || second == ALIVE || third == ALIVE) {
					live_neighbors += 1;
				}
			}
			if (c > 0) {
				let first = bytes[((r) * BUFFER_WIDTH * 3) + ((c - 1)*3)];
				let second = bytes[((r) * BUFFER_WIDTH * 3) + ((c - 1)*3) + 1];
				let third = bytes[((r) * BUFFER_WIDTH * 3) + ((c - 1)*3) + 2];
				if (first == ALIVE || second == ALIVE || third == ALIVE) {
					live_neighbors += 1;
				}
			}
			if (r > 0 && c > 0) {
				let first = bytes[((r - 1) * BUFFER_WIDTH * 3) + ((c - 1)*3)];
				let second = bytes[((r - 1) * BUFFER_WIDTH * 3) + ((c - 1)*3) + 1];
				let third = bytes[((r - 1) * BUFFER_WIDTH * 3) + ((c - 1)*3) + 2];
				if (first == ALIVE || second == ALIVE || third == ALIVE) {
					live_neighbors += 1;
				}
			}
			if (r < BUFFER_HEIGHT - 1 && c > 0) {
				let first = bytes[((r + 1) * BUFFER_WIDTH * 3) + ((c - 1)*3)];
				let second = bytes[((r + 1) * BUFFER_WIDTH * 3) + ((c - 1)*3) + 1];
				let third = bytes[((r + 1) * BUFFER_WIDTH * 3) + ((c - 1)*3) + 2];
				if (first == ALIVE || second == ALIVE || third == ALIVE) {
					live_neighbors += 1;
				}
			}
			if (r > 0 && c < BUFFER_WIDTH - 1) {
				let first = bytes[((r - 1) * BUFFER_WIDTH * 3) + ((c + 1)*3)];
				let second = bytes[((r - 1) * BUFFER_WIDTH * 3) + ((c + 1)*3) + 1];
				let third = bytes[((r - 1) * BUFFER_WIDTH * 3) + ((c + 1)*3) + 2];
				if (first == ALIVE || second == ALIVE || third == ALIVE) {
					live_neighbors += 1;
				}
			}
			if (live_neighbors < 2 || live_neighbors > 3) {
				bytes[(r * BUFFER_WIDTH * 3) + (c*3)] = DEAD;
				bytes[(r * BUFFER_WIDTH * 3) + (c*3) + 1] = DEAD;
				bytes[(r * BUFFER_WIDTH * 3) + (c*3) + 2] = DEAD;
			} else if (live_neighbors == 3) {
				bytes[(r * BUFFER_WIDTH * 3) + (c*3)] = ALIVE;
				bytes[(r * BUFFER_WIDTH * 3) + (c*3) + 1] = ALIVE;
				bytes[(r * BUFFER_WIDTH * 3) + (c*3) + 2] = ALIVE;
			}
		}
	}
}
function draw_bytes() {
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	for (let r = 0; r < BUFFER_HEIGHT; ++r) {
		for (let c = 0; c < BUFFER_WIDTH; ++c) {
			let curr_first = bytes[(r * BUFFER_WIDTH * 3) + (c*3)];
			let curr_second = bytes[(r * BUFFER_WIDTH * 3) + (c*3) + 1];
			let curr_third = bytes[(r * BUFFER_WIDTH * 3) + (c*3) + 2];
			ctx.beginPath();
			ctx.fillStyle = `rgb(${curr_first * 255} ${curr_second * 255} ${curr_third * 255})`;
			ctx.rect(c * NODE_WIDTH, r * NODE_HEIGHT, NODE_WIDTH, NODE_HEIGHT);
			ctx.fill();
		}
	}
}
function conway() {
	apply_conway_rules();
	draw_bytes();
	requestAnimationFrame(conway);
}
