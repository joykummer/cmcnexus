import React from 'react';
import CanI from '../Permissions';

export default function(props) {
	return (
		<div>
			<CanI perform="users:get">
				<div>I can.</div>
			</CanI>
			<CanI perform="users:get" yes={() => console.log("Yes!")}>
				<div>I can too.</div>
			</CanI>
			<CanI perform="users:delete" yes={() => console.log("Yes!")}>
				<div>But can I?.</div>
			</CanI>
		</div>
	)
}