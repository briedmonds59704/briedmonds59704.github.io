class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LinkedListGallery {
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
    }

    add(imageUrl) {
        const newNode = new Node(imageUrl);

        if (!this.head) {
            this.head = this.tail = this.current = newNode;
            return;
        }

        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }

    next() {
        if (this.current?.next) {
            this.current = this.current.next;
        }
        return this.current;
    }

    prev() {
        if (this.current?.prev) {
            this.current = this.current.prev;
        }
        return this.current;
    }
}

// Initialize Wonderland gallery
const gallery = new LinkedListGallery();

// Replace with your Wonderland images
gallery.add("Free_Square_Signboard_Mockup_3.jpg");
gallery.add("BriE-GlassFrogVectorDrawing.jpg");
gallery.add("postcard-mockup.jpg");
gallery.add("brochure-mockup.jpg");

const imgElement = document.getElementById("galleryImage");

// Show first image
imgElement.src = gallery.current.value;

function nextImage() {
    const node = gallery.next();
    if (node) imgElement.src = node.value;
}

function prevImage() {
    const node = gallery.prev();
    if (node) imgElement.src = node.value;
}
