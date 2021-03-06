import {jsPDF} from 'jspdf';
import {getAppState, getConfig} from "./state/StateManager";
import {TextBox} from "./model/slide/slide_objects/textbox/TextBox";
import {Shape} from "./model/slide/slide_objects/shape/Shape";
import {Picture} from "./model/slide/slide_objects/picture/Picture";
import {ShapeType} from "./model/slide/slide_objects/shape/ShapeType";
import {SlideObjectType} from "./model/slide/Slide";
import {SlidesMakerSlideType} from "./model/SlidesMaker";
import CanvasTextWrapper from 'canvas-text-wrapper';

function getBase64FromPicture(image: Picture): Promise<string> {
    return new Promise((resolve) => {
        const img: HTMLImageElement = new Image(image.rect.width, image.rect.height);
        img.src = image.src;
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            if (ctx)
                ctx.drawImage(img, 0, 0);
            const uri = canvas.toDataURL('image/png');
            resolve(uri);
        };
    });
}

function addTextBox(doc: jsPDF, object: TextBox) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
        const text = object.text;
        const width = object.rect.width;
        const height = object.rect.height;
        const font = object.font;
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = font.fontColor;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 4;
        CanvasTextWrapper.CanvasTextWrapper(canvas, text, {
            font: `${font.isItalic ? 'italic' : ''} ${font.isBold ? 'bold' : ''} ${font.fontSize}px ${font.fontName}`,
            textDecoration: font.isUnderlined ? 'underline' : 'none',
            textAlign: object.paragraph.alignmentState,
            paddingY: font.isUnderlined ? 12 : 0
        });
        const base64 = canvas.toDataURL();
        doc.addImage(
            base64,
            'PNG',
            object.rect.x,
            object.rect.y,
            width,
            height
        )
    }
}

function addRect(doc: jsPDF, object: Shape, mode: string) {
    doc.rect(
        object.rect.x,
        object.rect.y,
        object.rect.width,
        object.rect.height,
        mode);
}

function addTriangle(doc: jsPDF, object: Shape, mode: string) {
    doc.triangle(object.rect.x + object.rect.width / 2,
        object.rect.y,
        object.rect.x,
        object.rect.y + object.rect.height,
        object.rect.x + object.rect.width,
        object.rect.y + object.rect.height,
        mode);
}

function addEllipse(doc: jsPDF, object: Shape, mode: string) {
    doc.ellipse(
        object.rect.x + object.rect.width / 2,
        object.rect.y + object.rect.height / 2,
        object.rect.width / 2,
        object.rect.height / 2,
        mode);
}

function addShape(doc: jsPDF, object: Shape) {
    doc.setDrawColor(object.style.strokeColor);
    doc.setFillColor(object.style.backgroundColor)
    doc.setLineWidth(object.style.strokeWidth);
    const drawingMode = 'FD'; //DrawFill

    if (object.shapeType === ShapeType.RECTANGLE) {
        addRect(doc, object, drawingMode);
    } else if (object.shapeType === ShapeType.TRIANGLE) {
        addTriangle(doc, object, drawingMode);
    } else if (object.shapeType === ShapeType.ELLIPSE) {
        addEllipse(doc, object, drawingMode);
    }
}

function addImage(doc: jsPDF, object: Picture, base64: string) {
    doc.addImage(
        base64,
        'PNG',
        object.rect.x,
        object.rect.y,
        object.rect.width,
        object.rect.height
    );
}

async function addObjectOnPage(doc: jsPDF, object: TextBox | Shape | Picture) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
        if ('text' in object) {
            addTextBox(doc, object);
        }
        if ('shapeType' in object) {
            addShape(doc, object);
        } else if ('src' in object) {
            const base64 = await getBase64FromPicture(object);
            addImage(doc, object, base64);
        }
        resolve();
    });
}

async function addObjectsOnPage(doc: jsPDF, objects: Array<SlideObjectType>) {
    const promises = objects.map(async (slideObject) => {
        return addObjectOnPage(doc, slideObject.object);
    });
    await Promise.all(promises);
}

async function setBackgroundImage(doc: jsPDF, image: Picture) {
    image.rect.width = 1500;
    image.rect.height = 800;
    const base64 = await getBase64FromPicture(image);
    doc.addImage (
        base64,
        'jpg',
        0,
        0,
        getConfig().slideSize.width,
        getConfig().slideSize.height,
    );
}

function setBackgroundColor(doc: jsPDF, color: string) {
    doc.setFillColor(color);
    doc.rect(
        0,
        0,
        getConfig().slideSize.width,
        getConfig().slideSize.height,
        'F'
    );
}

async function addSlides(doc: jsPDF, slides: Array<SlidesMakerSlideType>) {
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i].slide;
        if (typeof(slide.background) == 'string')
        {
            setBackgroundColor(doc, slide.background)
        }
        else
        {
            await setBackgroundImage(doc, slide.background);
        }
        await addObjectsOnPage(doc, slide.objects);
        doc.addPage();
    }
}

export async function exportPDF() {
    const appConfig = getConfig();
    const slidesMaker = getAppState();
    const slideSize = [appConfig.slideSize.width, appConfig.slideSize.height];
    const doc = new jsPDF({
        unit: "px",
        orientation: 'l',
        format: slideSize,
    });
    await addSlides(doc, slidesMaker.slideList);
    doc.deletePage(doc.getNumberOfPages());
    doc.save('test.pdf');
}