import JoditEditor from "jodit-react";
import React from "react";

const EditorCV = ({ target, setTarget, title, key, handelOnChange = () => {}, stt }) => {
	return (
		<div key={stt}>
			<label htmlFor="" className="fw-bold">
				{title}
			</label>
			<JoditEditor
				value={target}
				tabIndex={1}
				onChange={(e) => {
					setTarget(e);
					handelOnChange({
                        e,
                        stt
                    });
				}}
			/>
		</div>
	);
};

export default EditorCV;
