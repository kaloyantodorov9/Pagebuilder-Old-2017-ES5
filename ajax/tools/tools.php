<div class="pb-edit-tool" data-edit="media" data-type="content">
	<div class="pb-tool-name">
		<h6>Image</h6>
	</div>
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<div class="pb-ui-media-tool">
				<div class="pb-background" data-media-preview style="background-image: url(images/placeholder.jpg);"></div>
			</div>
		</div>
	</div>
</div>

<div class="pb-edit-tool" data-edit="width" data-type="content">
	<div class="pb-tool-name">
		<h6>Width</h6>
	</div>
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<span class="pb-handler-label">Max Width %</span>
			<div class="pb-ui-actions">
				<input type="number" class="pb-ui-handler-input pb-controlls-val" data-tool="width" data-unit="%">
			</div>
		</div>
	</div>
</div>

<div class="pb-edit-tool" data-edit="height" data-type="content">
	<div class="pb-tool-name">
		<h6>Height</h6>
	</div>
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<span class="pb-handler-label">Max Height %</span>
			<div class="pb-ui-actions">
				<input type="number" class="pb-ui-handler-input pb-controlls-val" data-tool="height" data-unit="%">
			</div>
		</div>
	</div>
</div>

<div class="pb-edit-tool" data-edit="text-editor" data-type="content">
	<div class="pb-tool-name">
		<h6>Content</h6>
	</div>
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<textarea name="text-editor" class="pb-ui-handler-textarea pb-controlls-text" data-tool="text-editor"></textarea>
			<div class="pb-lang-type" id="pb-lang-type">
				<span class="active" data-lang="bg">BG</span>
				<span data-lang="en">EN</span>
				<span data-lang="ru">RU</span>
			</div>
		</div>
	</div>
</div>

<div class="pb-edit-tool" data-edit="typography" data-type="content">
	<div class="pb-tool-name">
		<h6>Typography</h6>
	</div>
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<span class="pb-handler-label">Text Align</span>
			<div class="pb-ui-actions">
				<select name="" class="pb-ui-handler-select pb-controlls-val" data-tool="text-align">
					<option value="">Default</option>
					<option value="center">Center</option>
					<option value="left">Left</option>
					<option value="right">Right</option>
					<option value="justify">Justify</option>
				</select>
			</div>
		</div>
	</div>
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<span class="pb-handler-label">Font Wight</span>
			<div class="pb-ui-actions">
				<select name="" class="pb-ui-handler-select pb-controlls-val" data-tool="font-weight">
					<option value="">Default</option>
					<option value="normal">Normal</option>
					<option value="bold">Bold</option>
					<option value="bolder">Bolder</option>
					<option value="light">Lighter</option>
				</select>
			</div>
		</div>
	</div>
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<span class="pb-handler-label">Text Decoration</span>
			<div class="pb-ui-actions">
				<select name="" class="pb-ui-handler-select pb-controlls-val" data-tool="text-decoration">
					<option value="">Default</option>
					<option value="none">None</option>
					<option value="underline">Underline</option>
					<option value="overline">Overline</option>
					<option value="line-through">Line-through</option>
					<option value="underline overline">Underline overline</option>
				</select>
			</div>
		</div>
	</div>
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<span class="pb-handler-label">Font size</span>
			<div class="pb-ui-actions">
				<input type="number" class="pb-ui-handler-input pb-controlls-val" data-tool="font-size" data-unit="px">
			</div>
		</div>
	</div>
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<span class="pb-handler-label">Color</span>
			<div class="pb-ui-actions">
				<input type="text" class="pb-ui-handler-input pb-controlls-val" data-colorpicker data-tool="color" readonly>
			</div>
		</div>
	</div>
</div>

<div class="pb-edit-tool" data-edit="align-items-verical" data-type="content">
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<span class="pb-handler-label">Vertical Align</span>
			<div class="pb-ui-actions">
				<select name="align-items-verical" class="pb-ui-handler-select pb-controlls-val" data-tool="align-items">
					<option value="">Default</option>
					<option value="center">Center</option>
					<option value="flex-start">Top</option>
					<option value="flex-end">Bottom</option>
				</select>
			</div>
		</div>
	</div>
</div>

<div class="pb-edit-tool" data-edit="align-items-horizontal" data-type="content">
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<span class="pb-handler-label">Horizontal Align</span>
			<div class="pb-ui-actions">
				<select name="align-items-horizontal" class="pb-ui-handler-select pb-controlls-val" data-tool="justify-content">
					<option value="">Default</option>
					<option value="baseline">Baseline</option>
					<option value="center">Center</option>
					<option value="flex-start">Left</option>
					<option value="flex-end">Right</option>
					<option value="space-between">Justify</option>
				</select>
			</div>
		</div>
	</div>
</div>

<div class="pb-edit-tool" data-edit="change-title-tags" data-type="content">
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<span class="pb-handler-label">HTML Tag</span>
			<div class="pb-ui-actions">
				<select name="change-title-tags" class="pb-ui-handler-select pb-change-html-tag">
					<option value="H1">H1</option>
					<option value="H2">H2</option>
					<option value="H3">H3</option>
					<option value="H4">H4</option>
					<option value="H5">H5</option>
					<option value="H6">H6</option>
					<option value="DIV">div</option>
					<option value="SPAN">span</option>
				</select>
			</div>
		</div>
	</div>
</div>

<div class="pb-edit-tool" data-edit="insert-link" data-type="content">
	<div class="pb-handlers">
		<div class="pb-ui-fld pb-ui-full">
			<span class="pb-handler-label">Link</span>
			<div class="pb-ui-actions">
				<input type="text" class="pb-ui-handler-input pb-ui-handler-link pb-insert-link-val" data-tool="insert-link" value="">
				<div class="pb-show-observe-tool" data-show-observe-tool="insert-link" title="Link options">
					<span class="pb-icon icon-star"></span>
				</div>
			</div>
		</div>
		<div class="pb-ui-hidden-fld" data-observe-tool="insert-link">
			<div class="pb-ui-fld">
				<div class="pb-ui-actions pb-ui-actions-checkbox">
					<label class="pb-label-checkbox">
						<input type="checkbox" class="pb-ui-handler-checkbox pb-link-attr-val" value="" data-link-attr="target:_blank">
						<span class="pb-handler-label-checkbox">Open in new window</span>
					</label>
					<label class="pb-label-checkbox">
						<input type="checkbox" class="pb-ui-handler-checkbox pb-link-attr-val" value="" data-link-attr="rel:nofollow">
						<span class="pb-handler-label-checkbox">Add nofollow</span>
					</label>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="pb-edit-tool" data-edit="edit-link" data-type="content">
	<div class="pb-handlers">
		<div class="pb-ui-fld pb-ui-full">
			<span class="pb-handler-label">Link</span>
			<div class="pb-ui-actions">
				<input type="text" class="pb-ui-handler-input pb-ui-handler-link pb-edit-link-val" data-tool="edit-link" value="">
				<div class="pb-show-observe-tool" data-show-observe-tool="edit-link" title="Link options">
					<span class="pb-icon icon-star"></span>
				</div>
			</div>
		</div>
		<div class="pb-ui-hidden-fld" data-observe-tool="edit-link">
			<div class="pb-ui-fld">
				<div class="pb-ui-actions pb-ui-actions-checkbox">
					<label class="pb-label-checkbox">
						<input type="checkbox" class="pb-ui-handler-checkbox pb-link-attr-val" value="" data-link-attr="target:blank">
						<span class="pb-handler-label-checkbox">Open in new window</span>
					</label>
					<label class="pb-label-checkbox">
						<input type="checkbox" class="pb-ui-handler-checkbox pb-link-attr-val" value="" data-link-attr="rel:nofollow">
						<span class="pb-handler-label-checkbox">Add nofollow</span>
					</label>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="pb-edit-tool" data-edit="background" data-type="styles">
	<div class="pb-tool-name">
		<h6>Background</h6>
	</div>
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<span class="pb-handler-label">Background color</span>
			<div class="pb-ui-actions">
				<input type="text" class="pb-ui-handler-input pb-controlls-val" data-colorpicker data-tool="background-color" value="" readonly>
			</div>
		</div>
	</div>
</div>

<div class="pb-edit-tool" data-edit="border" data-type="styles">
	<div class="pb-tool-name">
		<h6>Border</h6>
	</div>
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<span class="pb-handler-label">Border type</span>
			<div class="pb-ui-actions">
				<select name="" class="pb-ui-handler-select pb-controlls-val" data-tool="border">
					<option value="">Default</option>
					<option value="none">None</option>
					<option value="1px solid">Solid</option>
					<option value="1px dashed">Dashed</option>
					<option value="1px dotted">Dottted</option>
				</select>
			</div>
		</div>
		<div class="pb-ui-hidden-fld" data-observe-tool="border">
			<div class="pb-ui-fld">
				<span class="pb-handler-label">Border color</span>
				<div class="pb-ui-actions">
					<input type="text" class="pb-ui-handler-input pb-controlls-val" data-colorpicker data-tool="border-color" value="" readonly>
				</div>
			</div>
			<div class="pb-ui-fld">
				<div class="pb-handler-fw">
					<span class="pb-handler-label">Border Width</span>
					<div class="pb-ui-actions pb-ui-dimensions">
						<div class="pb-controll-dimensions">
							<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="top" value="" name="border-top-width" id="border-top-width" maxlength="2">
							<label for="border-top-width">Top</label>
						</div>
						<div class="pb-controll-dimensions">
							<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="right" value="" name="border-right-width" id="border-right-width" maxlength="2">
							<label for="border-right-width">Right</label>
						</div>
						<div class="pb-controll-dimensions">
							<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="bottom" value="" name="border-bottom-width" id="border-bottom-width" maxlength="2">
							<label for="border-bottom-width">Bottom</label>
						</div>
						<div class="pb-controll-dimensions">
							<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="left" value="" name="border-left-width" id="border-left-width" maxlength="2">
							<label for="border-left-width">Left</label>
						</div>
						<div class="pb-controll-dimensions">
							<button class="pb-link-dimensions" title="Обържи контролите">
								<span class="icon-left-arrow"></span>
							</button>
						</div>
						<input type="hidden" class="pb-controlls-val pb-hidden-controll pb-controll-dimensions-val" data-tool="border-width" value="" name="border-width">
					</div>
				</div>
			</div>
		</div>
		<div class="pb-ui-fld">
			<div class="pb-handler-fw">
				<span class="pb-handler-label">Border Radius</span>
				<div class="pb-ui-actions pb-ui-dimensions">
					<div class="pb-controll-dimensions">
						<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="top" value="" name="border-radius-top" id="border-radius-top" maxlength="3">
						<label for="border-top-width">Top</label>
					</div>
					<div class="pb-controll-dimensions">
						<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="right" value="" name="border-radius-right" id="border-radius-right" maxlength="3">
						<label for="border-right-width">Right</label>
					</div>
					<div class="pb-controll-dimensions">
						<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="bottom" value="" name="border-radius-bottom" id="border-radius-bottom" maxlength="3">
						<label for="border-bottom-width">Bottom</label>
					</div>
					<div class="pb-controll-dimensions">
						<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="left" value="" name="border-radius-left" id="border-radius-left" maxlength="3">
						<label for="border-left-width">Left</label>
					</div>
					<div class="pb-controll-dimensions">
						<button class="pb-link-dimensions" title="Обържи контролите">
							<span class="icon-left-arrow"></span>
						</button>
					</div>
					<input type="hidden" class="pb-controlls-val pb-hidden-controll pb-controll-dimensions-val" data-tool="border-radius" value="" name="border-radius">
				</div>
			</div>
		</div>
	</div>
</div>

<div class="pb-edit-tool" data-edit="dimensions" data-type="advanced">
	<div class="pb-tool-name">
		<h6>Dimensions</h6>
	</div>
	<div class="pb-handlers">
		<div class="pb-ui-fld">
			<div class="pb-handler-fw">
				<span class="pb-handler-label">Padding</span>
				<div class="pb-ui-actions pb-ui-dimensions">
					<div class="pb-controll-dimensions">
						<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="top" value="" name="padding-top" id="padding-top" maxlength="5">
						<label for="padding-top">Top</label>
					</div>
					<div class="pb-controll-dimensions">
						<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="right" value="" name="padding-right" id="padding-right" maxlength="5">
						<label for="padding-right">Right</label>
					</div>
					<div class="pb-controll-dimensions">
						<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="bottom" value="" name="padding-bottom" id="padding-bottom" maxlength="5">
						<label for="padding-bottom">Bottom</label>
					</div>
					<div class="pb-controll-dimensions">
						<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="left" value="" name="padding-left" id="padding-left" maxlength="5">
						<label for="padding-left">Left</label>
					</div>
					<div class="pb-controll-dimensions">
						<button class="pb-link-dimensions" title="Обържи контролите">
							<span class="icon-left-arrow"></span>
						</button>
					</div>
					<input type="hidden" class="pb-controlls-val pb-hidden-controll pb-controll-dimensions-val" data-tool="padding" value="" name="padding">
				</div>
			</div>
		</div>
		<div class="pb-ui-fld">
			<div class="pb-handler-fw">
				<span class="pb-handler-label">Margin</span>
				<div class="pb-ui-actions pb-ui-dimensions">
					<div class="pb-controll-dimensions">
						<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="top" value="" name="margin-top" id="margin-top" maxlength="5">
						<label for="margin-top">Top</label>
					</div>
					<div class="pb-controll-dimensions">
						<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="right" value="" name="margin-right" id="margin-right" maxlength="5">
						<label for="margin-right">Right</label>
					</div>
					<div class="pb-controll-dimensions">
						<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="bottom" value="" name="margin-bottom" id="margin-bottom" maxlength="5">
						<label for="margin-bottom">Bottom</label>
					</div>
					<div class="pb-controll-dimensions">
						<input type="number" class="pb-ui-handler-input pb-ui-dim-input" data-settings="left" value="" name="margin-left" id="margin-left" maxlength="5">
						<label for="margin-left">Left</label>
					</div>
					<div class="pb-controll-dimensions">
						<button class="pb-link-dimensions" title="Обържи контролите">
							<span class="icon-left-arrow"></span>
						</button>
					</div>
					<input type="hidden" class="pb-controlls-val pb-hidden-controll pb-controll-dimensions-val" data-tool="margin" value="" name="margin">
				</div>
			</div>
		</div>
	</div>
</div>