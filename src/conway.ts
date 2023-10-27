let cvs = document.querySelector('canvas') as HTMLCanvasElement;
let ctx = cvs.getContext("2d");
const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 500;
const BUFFER_HEIGHT = 100;
const BUFFER_WIDTH = 100;
const NODE_WIDTH = CANVAS_WIDTH / BUFFER_WIDTH;
const NODE_HEIGHT = CANVAS_HEIGHT / BUFFER_HEIGHT;
let bytes = new Uint8ClampedArray(BUFFER_HEIGHT * BUFFER_WIDTH * 3 /* times 3 because of RGB */);
main();
function main() {
	generate_seed(ctx);
	conway();
}
function generate_seed(ctx: CanvasRenderingContext2D) {
	let number_of_alive = Math.ceil(Math.random() * (BUFFER_HEIGHT * BUFFER_WIDTH));
	for (let i = 0; i < number_of_alive; ++i) {
		let col = Math.floor(Math.random() * BUFFER_WIDTH);
		let row = Math.floor(Math.random() * BUFFER_HEIGHT);
		bytes[(row * BUFFER_WIDTH * 3) + (col * 3)] = 1;
		bytes[(row * BUFFER_WIDTH * 3) + (col * 3) + 1] = 1;
		bytes[(row * BUFFER_WIDTH * 3) + (col * 3) + 2] = 1;
		ctx.beginPath();
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
				if (first > 0 || second > 0 || third > 0) {
					live_neighbors += 1;
				}
			}
			if (c < BUFFER_WIDTH - 1) {
				let first = bytes[((r) * BUFFER_WIDTH * 3) + ((c+1)*3)];
				let second = bytes[((r) * BUFFER_WIDTH * 3) + ((c+1)*3) + 1];
				let third = bytes[((r) * BUFFER_WIDTH * 3) + ((c+1)*3) + 2];
				if (first > 0 || second > 0 || third > 0) {
					live_neighbors += 1;
				}
			}
			if (r < BUFFER_HEIGHT - 1 && c < BUFFER_WIDTH - 1) {
				let first = bytes[((r+1) * BUFFER_WIDTH * 3) + ((c+1)*3)];
				let second = bytes[((r+1) * BUFFER_WIDTH * 3) + ((c+1)*3) + 1];
				let third = bytes[((r+1) * BUFFER_WIDTH * 3) + ((c+1)*3) + 2];
				if (first > 0 || second > 0 || third > 0) {
					live_neighbors += 1;
				}
			}
			if (r > 0) {
				let first = bytes[((r-1) * BUFFER_WIDTH * 3) + ((c)*3)];
				let second = bytes[((r-1) * BUFFER_WIDTH * 3) + ((c)*3) + 1];
				let third = bytes[((r-1) * BUFFER_WIDTH * 3) + ((c)*3) + 2];
				if (first > 0 || second > 0 || third > 0) {
					live_neighbors += 1;
				}
			}
			if (c > 0) {
				let first = bytes[((r) * BUFFER_WIDTH * 3) + ((c - 1)*3)];
				let second = bytes[((r) * BUFFER_WIDTH * 3) + ((c - 1)*3) + 1];
				let third = bytes[((r) * BUFFER_WIDTH * 3) + ((c - 1)*3) + 2];
				if (first > 0 || second > 0 || third > 0) {
					live_neighbors += 1;
				}
			}
			if (r > 0 && c > 0) {
				let first = bytes[((r - 1) * BUFFER_WIDTH * 3) + ((c - 1)*3)];
				let second = bytes[((r - 1) * BUFFER_WIDTH * 3) + ((c - 1)*3) + 1];
				let third = bytes[((r - 1) * BUFFER_WIDTH * 3) + ((c - 1)*3) + 2];
				if (first > 0 || second > 0 || third > 0) {
					live_neighbors += 1;
				}
			}
			if (r < BUFFER_HEIGHT - 1 && c > 0) {
				let first = bytes[((r + 1) * BUFFER_WIDTH * 3) + ((c - 1)*3)];
				let second = bytes[((r + 1) * BUFFER_WIDTH * 3) + ((c - 1)*3) + 1];
				let third = bytes[((r + 1) * BUFFER_WIDTH * 3) + ((c - 1)*3) + 2];
				if (first > 0 || second > 0 || third > 0) {
					live_neighbors += 1;
				}
			}
			if (r > 0 && c < BUFFER_WIDTH - 1) {
				let first = bytes[((r - 1) * BUFFER_WIDTH * 3) + ((c + 1)*3)];
				let second = bytes[((r - 1) * BUFFER_WIDTH * 3) + ((c + 1)*3) + 1];
				let third = bytes[((r - 1) * BUFFER_WIDTH * 3) + ((c + 1)*3) + 2];
				if (first > 0 || second > 0 || third > 0) {
					live_neighbors += 1;
				}
			}
			if (live_neighbors < 2 || live_neighbors > 3) {
				bytes[(r * BUFFER_WIDTH * 3) + (c*3)] = 0;
				bytes[(r * BUFFER_WIDTH * 3) + (c*3) + 1] = 0;
				bytes[(r * BUFFER_WIDTH * 3) + (c*3) + 2] = 0;
			} else if (live_neighbors == 3) {
				bytes[(r * BUFFER_WIDTH * 3) + (c*3)] = 1;
				bytes[(r * BUFFER_WIDTH * 3) + (c*3) + 1] = 1;
				bytes[(r * BUFFER_WIDTH * 3) + (c*3) + 2] = 1;
			}
		}
	}
}
function draw_bytes() {
	//ctx.clearRect(0, 0, cvs.width, cvs.height);
	ctx.beginPath();
	for (let r = 0; r < BUFFER_HEIGHT; ++r) {
		for (let c = 0; c < BUFFER_WIDTH; ++c) {
			let curr_first = bytes[(r * BUFFER_WIDTH * 3) + (c*3)];
			let curr_second = bytes[(r * BUFFER_WIDTH * 3) + (c*3) + 1];
			let curr_third = bytes[(r * BUFFER_WIDTH * 3) + (c*3) + 2];
			if (curr_first > 0 || curr_second > 0 || curr_third > 0) {
				ctx.fillStyle = `rgb(${curr_first}, ${curr_second}, ${curr_third}, 0)`;
				ctx.rect(c * NODE_WIDTH, r * NODE_HEIGHT, NODE_WIDTH, NODE_HEIGHT);
			} else {
				//ctx.fillStyle = `rgb(0, 0, 0, 0)`;
				//ctx.rect(c * NODE_WIDTH, r * NODE_HEIGHT, NODE_WIDTH, NODE_HEIGHT);
			}
		}
	}
	ctx.fill();
}
function conway() {
	apply_conway_rules();
	draw_bytes();
	requestAnimationFrame(conway);
}
