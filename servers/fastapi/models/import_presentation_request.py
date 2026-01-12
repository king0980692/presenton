from typing import List, Literal, Optional
from pydantic import BaseModel, Field


class ImportSlideContent(BaseModel):
    """單一 slide 的內容，需符合 template 的 json_schema"""
    layout_id: str = Field(..., description="Slide layout ID, e.g., 'general:basic-info-slide'")
    content: dict = Field(..., description="Slide content matching the layout's json_schema")
    speaker_note: Optional[str] = Field(default=None, description="Speaker note for this slide")


class ImportPresentationRequest(BaseModel):
    """直接匯入簡報內容，不經過 LLM"""
    title: str = Field(..., description="Presentation title")
    template: str = Field(default="general", description="Template name, e.g., 'general'")
    slides: List[ImportSlideContent] = Field(..., description="List of slides with content")
    language: str = Field(default="Traditional Chinese", description="Presentation language")
    export_as: Optional[Literal["pptx", "pdf"]] = Field(default=None, description="Export format (optional)")
