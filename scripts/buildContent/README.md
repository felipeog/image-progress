Before running the script, put the required images in the `scripts/buildContent/images` folder.

The script will:

- Upload the original images to Cloudinary
- Create placeholders for each image in `scripts/buildContent/placeholders` folder
- Upload the placeholders to Cloudinary

It assumes that folders `images` and `placeholders` exist on Cloudinary.
