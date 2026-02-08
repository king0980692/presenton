import json
import os
import uuid
from typing import List, Optional

from fastapi import APIRouter, Body, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from models.theme_model import ThemeModel
from models.sql.presentation import PresentationModel
from services.database import get_async_session

THEMES_ROUTER = APIRouter(prefix="/themes", tags=["Themes"])

# Path to default theme JSON files (relative to fastapi server root)
_DEFAULT_THEMES_DIR = os.path.join(
    os.path.dirname(__file__),
    "..", "..", "..", "..", "..",
    "nextjs", "themes", "default-themes",
)


def _load_default_themes() -> List[dict]:
    """Load all default theme JSONs from the themes directory."""
    themes = []
    themes_dir = os.path.normpath(_DEFAULT_THEMES_DIR)
    if not os.path.isdir(themes_dir):
        return themes
    for fname in sorted(os.listdir(themes_dir)):
        if fname.endswith(".json"):
            with open(os.path.join(themes_dir, fname), "r", encoding="utf-8") as f:
                themes.append(json.load(f))
    return themes


class ThemeListResponse(BaseModel):
    themes: List[dict]


class SetThemeRequest(BaseModel):
    theme: dict


class SetThemeResponse(BaseModel):
    presentation_id: uuid.UUID
    theme: dict


@THEMES_ROUTER.get("", response_model=ThemeListResponse)
async def list_themes():
    """List all available default themes."""
    themes = _load_default_themes()
    return ThemeListResponse(themes=themes)


@THEMES_ROUTER.put(
    "/presentations/{presentation_id}/theme",
    response_model=SetThemeResponse,
)
async def set_presentation_theme(
    presentation_id: uuid.UUID,
    request: SetThemeRequest,
    sql_session: AsyncSession = Depends(get_async_session),
):
    """Set or update the theme for a presentation."""
    presentation = await sql_session.get(PresentationModel, presentation_id)
    if not presentation:
        raise HTTPException(status_code=404, detail="Presentation not found")

    # Validate theme with Pydantic model
    try:
        ThemeModel(**request.theme)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid theme: {str(e)}")

    presentation.theme = request.theme
    sql_session.add(presentation)
    await sql_session.commit()

    return SetThemeResponse(
        presentation_id=presentation_id,
        theme=request.theme,
    )
