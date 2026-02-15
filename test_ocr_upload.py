import requests
import sys
import os
import json
import mimetypes

# Configuration
API_BASE = "http://localhost:11003/api/v1/ppt"

def test_ocr_upload(file_path):
    """
    Tests the OCR functionality by uploading a file and decomposing it.
    """
    if not os.path.exists(file_path):
        print(f"Error: File not found at {file_path}")
        return

    print(f"--- Testing OCR Upload for: {file_path} ---")

    # 1. Upload File
    print(f"\n1. Uploading file to {API_BASE}/files/upload...")
    
    mime_type, _ = mimetypes.guess_type(file_path)
    if not mime_type:
        if file_path.lower().endswith('.docx'):
            mime_type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        elif file_path.lower().endswith('.pptx'):
            mime_type = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        else:
            mime_type = 'application/octet-stream'

    print(f"   Detected MIME type: {mime_type}")

    files = {
        'files': (os.path.basename(file_path), open(file_path, 'rb'), mime_type)
    }
    
    try:
        response = requests.post(f"{API_BASE}/files/upload", files=files)
        response.raise_for_status()
        uploaded_paths = response.json()
        print(f"   Success! Uploaded temporary paths: {uploaded_paths}")
    except requests.exceptions.RequestException as e:
        print(f"   Upload failed: {e}")
        if hasattr(e, 'response') and e.response:
            print(f"   Server response: {e.response.text}")
        return

    # 2. Decompose File (Trigger OCR)
    print(f"\n2. Decomposing file (Extracting text + OCR) at {API_BASE}/files/decompose...")
    
    payload = {
        "file_paths": uploaded_paths
    }
    
    try:
        response = requests.post(f"{API_BASE}/files/decompose", json=payload)
        response.raise_for_status()
        decomposed_data = response.json()
        print(f"   Success! Decomposed {len(decomposed_data)} files.")
    except requests.exceptions.RequestException as e:
        print(f"   Decomposition failed: {e}")
        if hasattr(e, 'response') and e.response:
             print(f"   Server response: {e.response.text}")
        return

    # 3. Print Results
    print("\n--- OCR / Extraction Results ---")
    for item in decomposed_data:
        print(f"\nFile: {item.get('name')}")
        temp_text_path = item.get('file_path')
        
        # Read the extracted text content if possible (if it's a local path we can read)
        # Note: The backend creates a temp file. Since API and Script are on same machine (localhost), 
        # we might be able to read it if permission allows. 
        # But 'file_path' returned by backend is absolute path on backend server.
        
        if os.path.exists(temp_text_path):
            try:
                with open(temp_text_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    print("-" * 20)
                    print(content[:1000] + ("..." if len(content) > 1000 else "")) # Print first 1000 chars
                    print("-" * 20)
                    print(f"(Total length: {len(content)} characters)")
            except Exception as e:
                print(f"   Could not read result file directly: {e}")
        else:
             print(f"   Result file path: {temp_text_path} (File likely on server, cannot read directly from client script if paths differ)")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_ocr_upload.py <path_to_your_document>")
        print("Example: python test_ocr_upload.py C:\\Users\\User\\Documents\\scan.pdf")
    else:
        test_ocr_upload(sys.argv[1])
