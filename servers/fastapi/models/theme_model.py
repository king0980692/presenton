from typing import List, Literal, Optional
from pydantic import BaseModel, Field


class ThemeColors(BaseModel):
    primary: str = Field(default="#9333ea", description="Primary accent color → --primary-accent-color")
    secondary: str = Field(default="#F3F4F6", description="Secondary accent color → --secondary-accent-color")
    tertiary: str = Field(default="#E5E7EB", description="Tertiary accent color → --tertiary-accent-color")
    background: str = Field(default="#FFFFFF", description="Card/slide background → --card-background-color")
    headingText: str = Field(default="#111827", description="Heading text color → --text-heading-color")
    bodyText: str = Field(default="#6B7280", description="Body text color → --text-body-color")


class ThemeFontSpec(BaseModel):
    family: str = Field(default="Inter")
    weight: int = Field(default=400)


class ThemeFontSizes(BaseModel):
    h1: int = Field(default=48)
    h2: int = Field(default=36)
    h3: int = Field(default=24)
    body: int = Field(default=16)
    caption: int = Field(default=12)


class ThemeFonts(BaseModel):
    heading: ThemeFontSpec = Field(default_factory=ThemeFontSpec)
    body: ThemeFontSpec = Field(default_factory=ThemeFontSpec)
    sizes: ThemeFontSizes = Field(default_factory=ThemeFontSizes)


class ThemeSpacing(BaseModel):
    preset: Literal["compact", "normal", "wide"] = Field(default="normal")
    baseUnit: int = Field(default=8)
    lineHeight: float = Field(default=1.6)
    paragraphGap: int = Field(default=20)


class ThemeBackground(BaseModel):
    type: Literal["solid", "gradient", "image"] = Field(default="solid")
    value: str = Field(default="#FFFFFF")


class ThemePageNumber(BaseModel):
    show: bool = Field(default=False)
    position: str = Field(default="bottom-right")


class ThemeModel(BaseModel):
    """Pydantic model for validating theme definitions."""
    themeId: str = Field(..., description="Theme identifier, e.g. 'minimal', 'bold'")
    themeName: str = Field(..., description="Human-readable theme name")
    colors: ThemeColors = Field(default_factory=ThemeColors)
    fonts: ThemeFonts = Field(default_factory=ThemeFonts)
    spacing: ThemeSpacing = Field(default_factory=ThemeSpacing)
    background: Optional[ThemeBackground] = None
    pageNumber: Optional[ThemePageNumber] = None
