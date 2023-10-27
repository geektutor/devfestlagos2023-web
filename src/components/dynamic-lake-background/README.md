# This component renders a background that ideally fills up the entire screen.

## Helpful resources

[This article](https://webglfundamentals.org/webgl/lessons/webgl-2d-drawimage.html) explains how we draw our images.

In the article above, the author uses 4x4 matrices as it is part of a 3D webgl tutorial. However, we do not need that so we borrow some matrix math code from [here](https://webglfundamentals.org/webgl/resources/m3.js) and do everything with 3x3 matrices and vec3.

[This tutorial on using du/dv maps](https://www.youtube.com/watch?v=7T5o4vZXAvI) is what we used to render the distortion effect
